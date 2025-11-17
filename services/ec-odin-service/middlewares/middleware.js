/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
const constants = require('../config/constants');
const utils = require('../utils/utils');
const logger = require('../utils/logger');
const config = require('../config/config');

const conf = config[config.ENV];

/**
 * Function to get information about the organization
 */
const getOrgInfo = async (email, req) => {
  let orgInfo = 0;
  try {
    const orgInfoResult = await utils.getOrgInfo(email);
    if (orgInfoResult.status === 'success') {
      const { org_info, org_id } = orgInfoResult.result;
      const keyBase = conf.ORG_INFO_ENCRYPTION_KEY + org_id.slice(-6);
      const decryptedData = utils.decrypt(org_info, keyBase);
      orgInfo = JSON.parse(decryptedData);

      logger.info(`Request Params with org: originalURL: ${req.originalUrl}; method: ${req.method}; orgId: ${org_id}; orgURL: ${orgInfo.simpplr_base_url}`);

    }
  } catch (err) {
    logger.error(`Exception in fetching organization information : ${err}`);
  }
  return orgInfo;
};
/* Custom middleware to fetch access token from request  */
const getAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    req.access_token = accessToken;
    return next();
  } catch (err) {
    logger.error(`Exception in getAccessToken : ${err}`);
    return res.status(401).json({
      status: 'error',
      message: 'Please pass a valid access token in header.',
    });
  }
};

const isValidUrl = (url) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const pattern = new RegExp(regex);
  return pattern.test(url);
};

const getBaseUrl = async (req, res, next) => {
  try {
    /**
     * type string
     * email user uses to login to salesforce account, used to get org's information
     */
    let email = req.headers['x-user-email'];
    /**
     * type boolean
     * if org has managed package, we add Simpplr/ in url to make salesforce request
     */
    let managedPackage = req.headers['x-managed-package'];

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide salesforce username in x-user-email header.',
      });
    }
    // eslint-disable-next-line operator-linebreak

    let domainName;

    const orgInfo = await getOrgInfo(email, req);
    if (orgInfo) {
      domainName = orgInfo.simpplr_base_url;

      domainName =
        domainName.charAt(domainName.length - 1) === '/'
          ? domainName.slice(0, -1)
          : domainName;
      req.headers['x-simpplr-domain'] = domainName;

      if (orgInfo.rest_api_required) {
        let nameSpace = '';
        if (managedPackage === 'true' || managedPackage === true)
          nameSpace = 'Simpplr/';
        req.base_url = `${orgInfo.org_sf_instance_url}services/${nameSpace}apexrest`;
        req.use_json_headers = 1;
      } else {
        req.base_url = `${domainName}/apex`;
        /** MFA disabled org API call needs form data whereas MFA enabled needs json, use_json_headers helps us to make 
        req body accordingly in makePostRequest method **/
        req.use_json_headers = 0;
      }
    } else {
      logger.error({ message: 'Exception in fetching org info:' });
      throw new Error();
    }
    logger.info(`Request baseUrl is : ${req.baseUrl}`);
  } catch (err) {
    logger.error(`Exception in getBaseUrl : ${err}`);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
  return next();
};

const convertStringifiedKey = (key) => {
  switch (key) {
    case 'null':
      key = null;
      break;
    case 'true':
      key = true;
      break;
    case 'false':
      key = false;
      break;
    case '[]':
      key = [];
      break;
    default:
      try {
        key = Number.isNaN(parseInt(key, 10))
          ? JSON.parse(key)
          : parseInt(key, 10);
      } catch (err) {
        /* Do Nothing */
      }
      break;
  }
  return key;
};

const parseMultiPartData = (req, res) =>
  new Promise((resolve) => {
    utils.parseBoundaryData(
      req,
      res,
      constants.MAX_LIMIT_FILE_UPLOAD,
      async (error) => {
        if (error) {
          logger.error({ error, msg: error.message });
        }
        resolve();
      },
    );
  });

const parseRequestBody = async (req, res, next) => {
  try {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.includes(constants.MULTIPART_FORMDATA)) {
      await parseMultiPartData(req, res);
    }
    const whiteListedKeys = [
      'category-name',
      'name',
      'category',
      'display-from',
      'display-to',
      'sf-user-id',
      'extension',
      'joining-date',
      'since',
      'zoom-id',
      'action-at',
      'publish-at',
      'publish-to',
      'starts-at',
      'ends-at',
      'mobile',
      'phone',
      'from',
      'to',
      'hire-date',
      'file-ids',
      'title',
      'location',
    ];
    const keys = Object.keys(req.query);
    for (let i = 0; i < keys.length; i += 1) {
      if (!whiteListedKeys.includes(keys[i])) {
        req.query[keys[i]] = convertStringifiedKey(req.query[keys[i]]);
      }
    }
    const bodyKeys = Object.keys(req.body);
    // Parse req.body keys to required data type
    for (let i = 0; i < bodyKeys.length; i += 1) {
      if (!whiteListedKeys.includes(bodyKeys[i])) {
        req.body[bodyKeys[i]] = convertStringifiedKey(req.body[bodyKeys[i]]);
      }
    }
  } catch (err) {
    logger.error(`Exception in parseRequestBody : ${err}`);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
  return next();
};

const logRequestParams = (req, res, next) => {
  if (req.url === '/ping') {
    return next();
  }
  const params =
    typeof req.params === 'object' ? JSON.stringify(req.params) : '{}';
  const query =
    typeof req.query === 'object' ? JSON.stringify(req.query) : '{}';
  const body = typeof req.body === 'object' ? JSON.stringify(req.body) : '{}';
  logger.info(
    `***** Request details ***** URL: ${req.url} ***** Params: ${params}  ***** Query: ${query}  ***** Body: ${body}`,
  );
  return next();
};

module.exports = {
  getAccessToken,
  getBaseUrl,
  parseRequestBody,
  parseMultiPartData,
  logRequestParams,
};
