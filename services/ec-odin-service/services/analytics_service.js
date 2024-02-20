const utils = require('../utils/utils');
const response = require('../utils/responses');

const getAdoptionData = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getAdoptionData');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getAdoptionAverage = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getAdoptionAverage');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getAppPageViews = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getAppPageViews');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getAppAdoption = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getAppAdoption');
  if (!urn) {
    return response.mapingError(res);
  }
  const paramResult = utils.checkResultTypeParamValue(req, res);
  if (paramResult) {
    return paramResult;
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getViewsList = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getViewsList');
  if (!urn) {
    return response.mapingError(res);
  }
  const paramResult = utils.checkResultTypeParamValue(req, res);
  if (paramResult) {
    return paramResult;
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getContentEngagement = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getContentEngagement');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getContentPublications = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getContentPublications');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getContentViewsByType = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getContentViewsByType');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getContentViewsList = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getContentViewsList');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getContentReferralSources = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getContentReferralSources');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getKnowledgePageStats = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getKnowledgePageStats');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getNewsletters = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getNewsletters');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSocialEngagement = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSocialEngagement');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSocialEngagementList = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSocialEngagementList');
  if (!urn) {
    return response.mapingError(res);
  }
  const paramResult = utils.checkResultTypeParamValue(req, res);
  if (paramResult) {
    return paramResult;
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getCampaigns = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSocialCampaigns');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSearches = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSearches');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSearchList = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSearchList');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSearchesPerfomed = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSearchList');
  if (!urn) {
    return response.mapingError(res);
  }
  const paramResult = utils.checkResultTypeParamValue(req, res);
  if (paramResult) {
    return paramResult;
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getPeopleOverview = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getPeopleOverview');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getPeoplePerformance = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getPeoplePerformance');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getPeopleProfileCompleteness = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getPeopleProfileCompleteness');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    {},
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSiteCounts = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSiteCounts');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    {},
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getLowActivitySites = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getLowActivitySites');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSitePopularity = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSitePopularity');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getSitePublications = async (req, res) => {
  const urn = utils.getRequestUrn('analytics', 'getSitePublications');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  getAdoptionData,
  getAdoptionAverage,
  getAppPageViews,
  getAppAdoption,
  getViewsList,
  getContentEngagement,
  getContentPublications,
  getContentViewsByType,
  getContentViewsList,
  getContentReferralSources,
  getKnowledgePageStats,
  getNewsletters,
  getSocialEngagement,
  getSocialEngagementList,
  getCampaigns,
  getSearches,
  getSearchList,
  getSearchesPerfomed,
  getPeopleOverview,
  getPeoplePerformance,
  getPeopleProfileCompleteness,
  getSiteCounts,
  getLowActivitySites,
  getSitePopularity,
  getSitePublications,
};
