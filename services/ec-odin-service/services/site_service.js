/* eslint-disable no-unused-vars */
const utils = require('../utils/utils');
const response = require('../utils/responses');

// SEARCH FOR MYSITE
const mySite = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'searchMysite');
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

// GET SITE BY SITE_ID
const getById = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'getById');
  if (!urn) {
    return response.mapingError(res);
  }
  req.query.siteId = req.params.site_id;
  const resultObj = await utils.makeGetRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

// SITE SEARCH
const search = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'search');
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

// SITE CREATE
const create = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'create');
  if (!urn) {
    return response.mapingError(res);
  }
  if (req.body['category-name']) {
    req.body.category = {
      name: req.body['category-name'],
    };
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
    req.use_json_headers
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

// ADD MEMBER TO SITE
const addMember = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    userDetail: [
      {
        sfUserId: req.params.member_id,
        membershipType: 'member',
      },
    ],
  };
  const urn = utils.getRequestUrn('sites', 'addMember');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(uri, req.access_token, body, req.use_json_headers,);
  return res.status(resultObj.statusCode).send(resultObj);
};

// REMOVE MEMBER FROM SITE
const removeMember = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    sfUserId: req.params.member_id,
  };
  const urn = utils.getRequestUrn('sites', 'removeMember');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(uri, req.access_token, body, req.use_json_headers,);
  return res.status(resultObj.statusCode).send(resultObj);
};

// ADD FOLLOWER TO SITE
const addFollower = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    userDetail: [
      {
        sfUserId: req.params.follower_id,
        membershipType: 'follower',
      },
    ],
  };
  const urn = utils.getRequestUrn('sites', 'addFollower');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(uri, req.access_token, body, req.use_json_headers,);
  return res.status(resultObj.statusCode).send(resultObj);
};

// REMOVE FOLLOWER FROM SITE
const removeFollower = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    sfUserId: req.params.follower_id,
  };
  const urn = utils.getRequestUrn('sites', 'removeFollower');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(uri, req.access_token, body, req.use_json_headers,);
  return res.status(resultObj.statusCode).send(resultObj);
};

// UPDATE A SITE
const update = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'update');
  if (!urn) {
    return response.mapingError(res);
  }
  req.body.category = {
    id: req.body['category-id'],
  };
  const resultObj = await utils.makePostRequest(
    `${req.base_url + urn}&siteId=${req.params.site_id}`,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

// ACTIVATE A SITE
const activate = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'activate');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

// GET FILES FROM SITE BY SITE ID
const getFilesBySiteId = async (req, res) => {
  const urn = utils.getRequestUrn('sites', 'getFilesBySiteId');
  if (!urn) {
    return response.mapingError(res);
  }

  req.query.siteId = req.params.site_id;
  if (req.query['folder-id']) {
    req.query.directory = req.query['folder-id'];
    delete req.query['folder-id'];
  }

  const resultObj = await utils.makeGetRequest(
    req.base_url + urn + '&siteId=' + req.params.site_id,
    req.access_token,
    req.query,
    1,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  mySite,
  getById,
  search,
  create,
  addMember,
  removeMember,
  addFollower,
  removeFollower,
  update,
  activate,
  getFilesBySiteId,
};
