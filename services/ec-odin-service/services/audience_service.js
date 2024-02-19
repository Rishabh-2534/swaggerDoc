const utils = require('../utils/utils');
const response = require('../utils/responses');
const constants = require('../config/constants');
const logger = require('../utils/logger');
const got = require('got');

const addOrEditAudience = async (req, res) => {
  const urn = utils.getRequestUrn('audience', 'addOrEditAudience');
  if (!urn) {
    return response.mapingError(res);
  }
  if (req.body['hire-date']) {
    if (!req.body['hire-date-filter']) {
      return res.status(400).send({
        status: 'error',
        message: 'hire-date-filter is required',
      });
    }
  }
  if (req.body.type === 'people' && !req.body['list-of-people']) {
    return res.status(400).send({
      status: 'error',
      message: 'list-of-people is required when type is people',
    });
  }
  utils.makeReqBodyForAudience(req);
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const deleteAudience = async (req, res) => {
  const urn = utils.getRequestUrn('audience', 'deleteAudience');
  if (!urn) {
    return response.mapingError(res);
  }
  const body = {
    audienceId: req.params.audience_id,
  };

  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const uploadAudience = async (req, res) => {
  try {
    // get Jwt token
    const jwtUrn = constants.GET_JWT_TOKEN;
    const jwtTokenResult = await utils.makeGetRequest(
      req.base_url + jwtUrn,
      req.access_token,
      {},
    );
    // fetch org info
    const email = req.headers['x-user-email'];
    const orgInfoResult = await utils.getOrgInfo(email);

    const urn = utils.getRequestUrn('audience', 'uploadAudience');
    if (!urn) {
      return response.mapingError(res);
    }
    let body = {
      orgId: orgInfoResult.result.org_id,
      action: 'getPresignedURL',
    };

    // make post req to lambda to fetch s3 url
    const s3UrlResponse = await utils.makePostRequest(
      urn,
      jwtTokenResult.data.jwtToken,
      body,
      1,
      1,
    );
    const s3Url = s3UrlResponse.data.response.url;
    const options = {
      headers: {
        'Content-Type': 'text/csv',
      },
      body: req.files[0]['csv-file'],
    };

    // make a put req to s3 to store csv
    await got.put(s3Url, options);

    // get people id
    const peopleInfo = constants.GET_USER_INFO;
    const peopleInfoResult = await utils.makeGetRequest(
      req.base_url + peopleInfo,
      req.access_token,
      {},
    );

    body = {
      action: 'saveAudience',
      externalFileId: s3UrlResponse.data.response.fileId,
      name: req.body.name,
      orgId: orgInfoResult.result.org_id,
      peopleId: peopleInfoResult.data.currentUser.peopleId,
      title: req.files[0].filename,
    };
    const resultObj = await utils.makePostRequest(
      urn,
      jwtTokenResult.data.jwtToken,
      body,
      1,
      1,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

module.exports = {
  addOrEditAudience,
  deleteAudience,
  uploadAudience,
};
