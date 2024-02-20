const utils = require('../utils/utils');
const logger = require('../utils/logger');
const response = require('../utils/responses');
const fileUploadService = require('./fileUpload_service');

const getBlogById = async (req, res) => {
  const urn = utils.getRequestUrn('blog', 'getById');
  if (!urn) {
    return response.mapingError(res);
  }
  req.query.contentId = req.params.content_id;
  const resultObj = await utils.makeGetRequest(
    `${req.base_url + urn}&contentId=${req.params.content_id}`,
    req.access_token,
    req.query,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const createBlog = async (req, res) => {
  try {
    const urn = utils.getRequestUrn('blog', 'createBlog');
    if (!urn) {
      return response.mapingError(res);
    }
    await fileUploadService.processFileRequest(req, res);
    const uri =
      req.base_url +
      urn +
      (req.body['site-id'] ? `&site_id=${req.body['site-id']}` : '');
    if (req.body['site-id']) {
      delete req.body['site-id'];
    }
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const urn = utils.getRequestUrn('blog', 'update');
    if (!urn) {
      return response.mapingError(res);
    }

    if (req.body['authored-by']) {
      req.body['authored-by'] = {
        peopleId: req.body['authored-by'],
      };
    }
    await fileUploadService.processFileRequest(req, res);
    const resultObj = await utils.makePostRequest(
      `${req.base_url + urn}&contentId=${req.params.content_id}`,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const deleteBlog = async (req, res) => {
  const urn = utils.getRequestUrn('blog', 'delete');
  if (!urn) {
    return response.mapingError(res);
  }
  const body = {
    contentId: req.params.content_id,
  };
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
