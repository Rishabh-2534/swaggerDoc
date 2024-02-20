const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const blogSearchValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  return next();
};

const createBlogValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    'publish-at': Joi.string().required(),
    body: Joi.string().optional(),
    summary: Joi.string().optional(),
    id: Joi.string().optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    'list-of-files': Joi.array().optional(),
    'original-file': Joi.string().allow(null).optional(),
    'landscape-file': Joi.string().allow(null).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const updateBlogValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id is required',
    );
  }
  const schema = Joi.object({
    title: Joi.string().required(),
    'publish-at': Joi.string().required(),
    body: Joi.string().optional(),
    summary: Joi.string().optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    'list-of-files': Joi.array().optional(),
    'original-file': Joi.string().allow(null).optional(),
    'landscape-file': Joi.string().allow(null).optional(),
    'authored-by': Joi.string().optional(),
  });
  return utils.validateRequest(req, res, next, schema, 1);
};

const deleteBlogValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  return next();
};

module.exports = {
  blogSearchValidator,
  createBlogValidator,
  updateBlogValidator,
  deleteBlogValidator,
};
