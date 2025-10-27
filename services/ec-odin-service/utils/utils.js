/* eslint-disable array-callback-return */
/* eslint-disable no-cond-assign */
const jwt = require('jsonwebtoken');
const jsforce = require('jsforce');
const got = require('got');
const crypto = require('crypto');

const constants = require('../config/constants');
const config = require('../config/config');
const logger = require('./logger');
const response = require('./responses');

const conf = config[config.ENV];

const getRedirectUri = (accessToken, name, email) => {
  // Prepare JWT Token and redirect to readme

  logger.info(`User name is : ${name} ***  user email is : ${email}`);
  const user = {
    name,
    email,
    apiKey: accessToken,
  };

  const authToken = jwt.sign(user, conf.README_JWT_SECRET);
  return `${conf.README_URL}?auth_token=${authToken}`;
};

const getSfConnection = (instanceUrl, accessToken) => {
  const conn = new jsforce.Connection({
    instanceUrl,
    accessToken,
  });
  return conn;
};

/**
 *
 * @param {string type unique key for encryption} input
 * @returns hased string for decryption
 */
const getEncryptionKey = (input) => {
  const hexKey = crypto.createHash('sha256').update(input).digest('hex');
  return hexKey.substring(0, 32);
};

/**
 *
 * @param {encrypted data} text
 * @param {string type unique keybase} keyBase
 * @returns dectrypted orgInfo
 */
const decrypt = (text, keyBase) => {
  const iv = Buffer.from(text.substring(32, 64), 'hex');
  const encryptedText = Buffer.from(text.substring(64), 'hex');
  const encryptionKey = getEncryptionKey(keyBase);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

/**
 *
 * @param {user email to fetch its org info} email
 * @returns encrypted org info
 */
const getOrgInfo = async (email) => {
  const { ORG_INFO_URL, ORG_INFO_ENCRYPTION_KEY } = conf;
  try {
    const options = {
      headers: {
        'x-simpplr-auth-key': ORG_INFO_ENCRYPTION_KEY,
      },
      json: { email: email, origin: 'api_center', app_type: 'NATIVE' },
    };
    const response = await got.post(ORG_INFO_URL, options);
    logger.info(`'Post request response - getOrgInfo : ${response.body}`);
    return JSON.parse(response.body);
  } catch (err) {
    logger.error(`Exception in makePostRequest - getOrgInfo : ${err}`);
  }
};
/*
We take hyphenated param names. Convert it to params accepted
by the SF API.

is-correction-enabled --> isCorrectionEnabled
*/
const getParamName = (param) => {
  const paramArray = param.split('-');
  let paramName = paramArray[0];
  const len = paramArray.length;
  for (let i = 1; i < len; i += 1) {
    const word = paramArray[i];
    paramName += word.charAt(0).toUpperCase() + word.slice(1);
  }
  return paramName;
};

const makeReqBody = (body) => {
  const newBody = {};
  const keys = Object.keys(body);
  const values = Object.values(body);
  let finalParam;
  for (let i = 0; i < keys.length; i += 1) {
    finalParam = getParamName(keys[i]);
    newBody[finalParam] = values[i];
    if (
      newBody[finalParam] &&
      typeof newBody[finalParam] === 'object' &&
      !Array.isArray(newBody[finalParam])
    ) {
      newBody[finalParam] = makeReqBody(newBody[finalParam]);
    }
  }
  return newBody;
};

const makeQueryString = (query) => {
  let queryString = '';
  const keys = Object.keys(query);
  const values = Object.values(query);
  for (let i = 0; i < keys.length; i += 1) {
    queryString += `&${getParamName(keys[i])}=${values[i]}`;
  }
  return queryString;
};

/*
    In case of errors, we get an HTML page
    Parse it and send the appropriate response
*/
// TODO: Check the error response for GET requests
const parseSfResponse = (res) => {
  let resultObj = {};
  let status = 200;
  const errorStr = res;
  const indexOfErrorMsg = errorStr.indexOf('id="theErrorPage:theError"');
  if (errorStr.indexOf('<html') >= 0 && errorStr.indexOf('</html>') >= 0) {
    resultObj.status = 'error';
    status = 401;
    if (indexOfErrorMsg >= 0) {
      let processStr = '';
      processStr = errorStr.substring(indexOfErrorMsg, errorStr.length);
      processStr = processStr.substring(
        processStr.indexOf('>') + 1,
        processStr.indexOf('</span>'),
      );
      resultObj.message = processStr;
      resultObj.i18nmessage = processStr;
    } else if (errorStr.indexOf('/visualforce/session') >= 0) {
      resultObj.message = 'SESSION_TIMEOUT';
      resultObj.i18nmessage = 'SESSION_TIMEOUT';
    }
  } else {
    try {
      resultObj = JSON.parse(res);
    } catch (err) {
      logger.error(`Exception in parseSfResponse : ${err}`);
      resultObj = res;
    }
  }
  logger.trace(`Response from SF in parseSfResponse: ${resultObj}`);
  delete resultObj.debugLogs;
  return { status, resultObj };
};

const makePostRequest = async (
  url,
  accessToken,
  reqBody,
  useJsonHeader = 0,
  useData = 0,
) => {
  try {
    const body =
      typeof reqBody === 'object'
        ? { data: JSON.stringify(makeReqBody(reqBody)) }
        : { data: reqBody };
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: body,
    };
    if (useJsonHeader) {
      delete options.form;
      // condition to check if API request is for file upload or other API request(file upload has different body)
      if (
        url.includes('/services/data/v50.0/sobjects/ContentVersion') ||
        useData
      ) {
        options.body = JSON.stringify(makeReqBody(reqBody));
      } else {
        options.body = JSON.stringify({ data: makeReqBody(reqBody) });
      }
      options.headers['Content-Type'] = 'application/json';
    }
    const gotResponse = await got.post(url, options);
    // Do not log responses in prod!
    logger.info(`Body of gotResponse is ${gotResponse.body}`);
    return response.getResponseObj(gotResponse.body);
  } catch (err) {
    logger.error(`Exception in makePostRequest : ${err}`);
    return response.getResponseObj({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

const fetchContentForApproval = async (url, accessToken) => {
  logger.info(
    ` ***  Request url is : ${url} ***  AccessToken is : ${accessToken}`,
  );
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }, // ,
    // 'searchParams' : query
  };
  try {
    const gotResponse = await got.get(url, options);
    // Do not log responses in prod!
    logger.info(`Body of gotResponse is : ${gotResponse.body}`);
    return response.getResponseObj(gotResponse.body);
  } catch (err) {
    logger.error(`Exception in fetchContentForApproval : ${err}`);
    return response.getResponseObj({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

const makeGetRequest = async (url, accessToken, query, useData = 0) => {
  logger.info(
    ` *** Request url is : ${url} ***  AccessToken is : ${accessToken} ***  Query is : ${query}`,
  );
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }, // ,
    // 'searchParams' : query
  };
  try {
    const body = useData
      ? '&data=' + JSON.stringify(makeReqBody(query))
      : makeQueryString(query);
    const gotResponse = await got.get(url + body, options);
    // Do not log responses in prod!
    logger.info(`Body of gotResponse is ${gotResponse.body}`);
    return response.getResponseObj(gotResponse.body);
  } catch (err) {
    logger.error(`Exception in makeGetRequest : ${err}`);
    return response.getResponseObj({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

const getRequestUrn = (resource, action) => {
  try {
    return constants.urn_dict[resource][action];
  } catch (err) {
    return null;
  }
};

const getMatching = (string, regex) => {
  // Helper function when using non-matching groups
  const matches = string.match(regex);
  if (!matches || matches.length < 2) {
    return null;
  }
  return matches[1];
};

const getBoundary = (contentTypeArray) => {
  const boundaryPrefix = 'boundary=';
  let boundary = contentTypeArray.find(
    (item) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      item.startsWith(boundaryPrefix),
    // eslint-disable-next-line function-paren-newline
  );
  if (!boundary) return null;
  boundary = boundary.slice(boundaryPrefix.length);
  if (boundary) boundary = boundary.trim();
  return boundary;
};

const parseBoundaryData = (request, res, maxLength, callback) => {
  let contentType = request.headers['content-type'];
  const contentTypeArray = contentType.split(';').map((item) => item.trim());
  if (contentTypeArray && contentTypeArray.length) {
    [contentType] = contentTypeArray;
  }

  if (!contentType) {
    response.endRequestWithError(
      res,
      400,
      'Content type not specified',
      callback,
    );
    return;
  }
  if (!/(multipart\/form-data)/.test(contentType)) {
    response.endRequestWithError(
      res,
      400,
      'Content type is not supported',
      callback,
    );
    return;
  }
  // Use latin1 encoding to parse binary files correctly
  request.setEncoding('latin1'); // TODO: Check readme file upload after commenting

  let rawData = '';
  request.on('data', (chunk) => {
    rawData += chunk;
  });
  request.on('end', () => {
    const boundary = getBoundary(contentTypeArray);
    if (!boundary) {
      response.endRequestWithError(
        res,
        400,
        'Boundary information missing',
        callback,
      );
      return;
    }
    // const result = {};
    const rawDataArray = rawData.split(boundary);
    // eslint-disable-next-line array-callback-return
    rawDataArray.map((item) => {
      // Use non-matching groups to exclude part of the result
      let name = getMatching(item, /(?:name=")(.+?)(?:")/);
      if (name) {
        name = name.trim();
        const value = getMatching(item, /(?:\r\n\r\n)([\S\s]*)(?:\r\n--$)/);
        let filename = getMatching(item, /(?:filename=")(.*?)(?:")/);
        if (value) {
          if (filename) {
            filename = filename.trim();
            // Add the file information in a files array
            if (value.length > maxLength) {
              response.endRequestWithError(
                res,
                413,
                `File: ${name} size should be less than ${maxLength} Bytes`,
                callback,
              );
              return;
            }
            const file = {};
            file[name] = value;
            file.filename = filename;
            let fContentType = getMatching(
              item,
              /(?:Content-Type:)(.*?)(?:\r\n)/,
            );

            if (fContentType) {
              fContentType = fContentType.trim();
              file['Content-Type'] = fContentType;
              const sContentType = fContentType.split('image/');
            }

            if (!request.files) {
              request.files = [];
            }
            if (!request.listOfFiles) {
              request.listOfFiles = [];
            }
            if (!request.listOfAlbumMedia) {
              request.listOfAlbumMedia = [];
            }
            if (file['list-of-files']) {
              request.listOfFiles.push({
                fileContent: file['list-of-files'],
                filename: file.filename,
                'Content-Type': file['Content-Type'],
              });
            } else if (file['list-of-album-media']) {
              request.listOfAlbumMedia.push({
                fileContent: file['list-of-album-media'],
                filename: file.filename,
                'Content-Type': file['Content-Type'],
              });
            } else {
              request.files.push(file);
            }
          } else {
            // Key/Value pair
            request.body[name] = Buffer.from(value, 'latin1').toString();
          }
        }
      }
    });
    callback(null);
  });
};

const validateRequest = (req, res, next, schema, body = 1) => {
  const { error, value } = schema.validate(req[body ? 'body' : 'query'], {
    allowUnknown: true,
    stripUnknown: true,
  });
  if (error) {
    return response.invalidParam(
      res,
      `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
    );
  }
  req[body ? 'body' : 'query'] = value;
  return next();
};

const makeReqBodyForListOfPeople = (body) => {
  const newBody = [];
  for (let i = 0; i < body.length; i += 1) {
    const paramName = { peopleId: body[i] };
    newBody.push(paramName);
  }
  return newBody;
};

const makereqBodyForListOfConditions = (body) => {
  const newBody = [];
  for (let i = 0; i < body.length; i += 1) {
    const paramName = { name: body[i] };
    newBody.push(paramName);
  }
  return newBody;
};

const makeReqBodyForAudience = (req) => {
  if (req.body.type === 'people') {
    const newBody = makeReqBodyForListOfPeople(req.body['list-of-people']);
    req.body['list-of-people'] = newBody;
  } else {
    const conditons = [];
    if (req.body.city) {
      const cityBody = { name: 'city' };
      const valuesForCityBody = makereqBodyForListOfConditions(req.body.city);
      cityBody.values = valuesForCityBody;
      conditons.push(cityBody);
      delete req.body.city;
    }
    if (req.body.company) {
      const companyBody = { name: 'company' };
      const valuesForCompanyBody = makereqBodyForListOfConditions(
        req.body.company,
      );
      companyBody.values = valuesForCompanyBody;
      conditons.push(companyBody);
      delete req.body.company;
    }
    if (req.body.country) {
      const countryBody = { name: 'country' };
      const valuesForCountryBody = makereqBodyForListOfConditions(
        req.body.country,
      );
      countryBody.values = valuesForCountryBody;
      conditons.push(countryBody);
      delete req.body.country;
    }
    if (req.body.department) {
      const departmentBody = { name: 'department' };
      const valuesForDepartmentBody = makereqBodyForListOfConditions(
        req.body.department,
      );
      departmentBody.values = valuesForDepartmentBody;
      conditons.push(departmentBody);
      delete req.body.department;
    }
    if (req.body.division) {
      const divisionBody = { name: 'division' };
      const valuesForDivisionBody = makereqBodyForListOfConditions(
        req.body.division,
      );
      divisionBody.values = valuesForDivisionBody;
      conditons.push(divisionBody);
      delete req.body.division;
    }
    if (req.body.title) {
      const titleBody = { name: 'title' };
      const valuesForTitleBody = makereqBodyForListOfConditions(req.body.title);
      titleBody.values = valuesForTitleBody;
      conditons.push(titleBody);
      delete req.body.title;
    }
    if (req.body.state) {
      const stateBody = { name: 'state' };
      const valuesForStateBody = makereqBodyForListOfConditions(req.body.state);
      stateBody.values = valuesForStateBody;
      conditons.push(stateBody);
      delete req.body.state;
    }
    if (req.body['hire-date']) {
      const hireDateBody = {
        name: 'hireDate',
        values: [
          { name: req.body['hire-date'], id: req.body['hire-date-filter'] },
        ],
      };
      conditons.push(hireDateBody);
      delete req.body['hire-date'];
      delete req.body['hire-date-filter'];
    }
    req.body.listOfConditions = conditons;
  }
};

/**
 * Fetch access token required to upload Video to Kaltura
 * @param {object} req
 * @returns {object}
 */
const getAccessToken = async (req) => {
  const urn = getRequestUrn('videos', 'getAccessToken');
  if (!urn) {
    logger.error('URN not found for getAccessToken');
    return null;
  }
  const resultObj = await makeGetRequest(
    req.base_url + urn,
    req.access_token,
    {},
  );
  return resultObj;
};

/**
 * Add a video to a particular category (site)
 * @param {object} req
 * @param {string} site_id
 * @param {object} mediaParams
 * @param {object} uploadedVideoParams
 * @returns {object}
 */
const addVideoToCategory = async (
  req,
  mediaParams,
  uploadedVideoParams,
  siteId = null,
) => {
  const urn = getRequestUrn('videos', 'addVideoToCategory');
  if (!urn) {
    logger.error('URN not found for addVideoToCategory');
    return null;
  }
  if (!(mediaParams && uploadedVideoParams)) {
    logger.error('mediaParams and uploadedVideoParams are mandatory.');
    return null;
  }
  const body = {
    siteId,
    mediaParams,
    uploadedVideoParams,
  };
  const resultObj = await makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
  );
  return resultObj;
};

const getChatterGroupId = async (req, siteId) => {
  const urn = getRequestUrn('sites', 'getById');
  if (!urn) {
    logger.error('URN not found for getAccessToken');
    return null;
  }
  const body = {
    siteId,
  };
  const resultObj = await makeGetRequest(
    req.base_url + urn,
    req.access_token,
    body,
  );
  return resultObj;
};

const postVideoDataOnFeed = async (req, textBody) => {
  let locationURL;
  const { siteId } = req.body;
  const body = {
    communityId: null,
    subjectId: 'me',
    feedElementType: 'news',
    textBody: textBody,
    listOfTopic: [],
    action: 'posttextpost',
  };
  if (siteId && siteId.length > 0) {
    locationURL = `${req.base_url}/app?u=/site/${siteId}/dashboard`;
    const siteDetailsResponse = await getChatterGroupId(req, siteId);
    if (!siteDetailsResponse || siteDetailsResponse.statusCode !== 200) {
      return {
        statusCode: siteDetailsResponse.statusCode,
        message: siteDetailsResponse.message,
      };
    }
    const { data } = siteDetailsResponse;
    const { chatterGroupId } = data;
    body.subjectId = chatterGroupId;
    body.feedElementType = 'record';
  } else {
    locationURL = `${req.base_url}/app?u=/feed`;
  }
  body[locationURL] = locationURL;
  const urn = getRequestUrn('videos', 'connectAPIInteraction');
  if (!urn) {
    logger.error('URN not found for postVideoDataOnFeed');
    return null;
  }

  const resultObj = await makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
  );
  return resultObj;
};

const makeTextBodyForVideoUpload = async (
  mediaParams,
  uploadedVideoParams,
  url,
) => {
  let externalFileInfoStr = '';
  let fileStarter = '';
  let fileEnd = '';
  let seprator = ' | ';
  let newLine = '\n';
  let type = 'MP4';
  let context = 'native_video';
  let bodyToFileSeprator = '\u2063\uFEFF\u200b\uFEFF\u2063';
  let singleFileInfoStr = '';

  singleFileInfoStr =
    newLine +
    fileStarter +
    mediaParams.name +
    seprator +
    mediaParams.id +
    seprator +
    uploadedVideoParams.fileSize +
    seprator +
    type +
    seprator +
    context +
    seprator +
    url +
    fileEnd;
  externalFileInfoStr = externalFileInfoStr + singleFileInfoStr;
  externalFileInfoStr = externalFileInfoStr.substring(1);
  const finalString = '' + bodyToFileSeprator + externalFileInfoStr;
  return finalString;
};

const checkResultTypeParamValue = (req, res) => {
  if (
    req.query['filter-by'] === 'department' &&
    req.query['result-type'] === 'department'
  ) {
    return response.invalidParam(
      res,
      'Result-type should be location when filter-by is department',
    );
  } else if (
    req.query['filter-by'] === 'location' &&
    req.query['result-type'] === 'location'
  ) {
    return response.invalidParam(
      res,
      'Result-type should be department when filter-by is location',
    );
  }
};

/**
 * Validate anniversary date range (workAnniversary or birthAnniversary)
 * Checks if:
 * 1. Start date is less than end date
 * 2. The difference between start and end dates is not more than 90 days
 * @param {string|object} anniversaryValue - Either a relative date string or an object with start/end dates
 * @param {string} fieldName - Name of the field (e.g., 'workAnniversary', 'birthAnniversary')
 * @returns {object|null} - Returns error object if validation fails, null if valid
 */
const validateAnniversaryDateRange = (anniversaryValue, fieldName) => {
  // If it's a relative date string (e.g., "20d", "2m"), skip validation
  // as the range is implied by the relative date
  if (typeof anniversaryValue === 'string') {
    return null;
  }

  // If it's an object with start and end dates
  if (
    anniversaryValue &&
    typeof anniversaryValue === 'object' &&
    anniversaryValue.start &&
    anniversaryValue.end
  ) {
    const startDate = new Date(anniversaryValue.start);
    const endDate = new Date(anniversaryValue.end);

    // Check if dates are valid
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return {
        message: `Invalid date format for ${fieldName}. Dates must be in YYYY-MM-DD format.`,
        code: 'INVALID_DATE_FORMAT',
      };
    }

    // Check if start date is less than end date
    if (startDate >= endDate) {
      return {
        message: `For ${fieldName}, start date must be less than end date.`,
        code: 'INVALID_DATE_ORDER',
      };
    }

    // Calculate difference in milliseconds and convert to days
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if difference is more than 90 days
    if (diffDays > 90) {
      return {
        message: `The difference between start and end dates for ${fieldName} cannot be more than 90 days. Current difference: ${diffDays} days.`,
        code: 'INVALID_DATE_RANGE',
      };
    }
  }

  return null;
};

module.exports = {
  getRedirectUri,
  getSfConnection,
  makePostRequest,
  makeGetRequest,
  parseSfResponse,
  getRequestUrn,
  parseBoundaryData,
  validateRequest,
  getParamName,
  makeReqBody,
  makeQueryString,
  getMatching,
  getBoundary,
  makeReqBodyForListOfPeople,
  makereqBodyForListOfConditions,
  makeReqBodyForAudience,
  getOrgInfo,
  decrypt,
  getAccessToken,
  addVideoToCategory,
  postVideoDataOnFeed,
  makeTextBodyForVideoUpload,
  checkResultTypeParamValue,
  fetchContentForApproval,
  validateAnniversaryDateRange,
};
