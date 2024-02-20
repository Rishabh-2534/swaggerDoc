/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const createSiteValidator = (req, res, next) => {
  const schema = Joi.object({
    access: Joi.string().valid('public', 'private', 'unlisted').required(),
    'landing-page': Joi.string()
      .valid('dashboard', 'feed', 'content', 'files', 'about')
      .required(),
    'is-membership-auto-approved': Joi.boolean().required(),
    name: Joi.string().required(),
    'category-name': Joi.string().required(), // Category Name
    'has-pages': Joi.boolean().optional(),
    'has-albums': Joi.boolean().optional(),
    'has-events': Joi.boolean().optional(),
    'has-dashboard': Joi.boolean().optional(),
    'is-question-answer-enabled': Joi.boolean().required(),
    'is-content-submissions-enabled': Joi.boolean().required(),
    'is-owner': Joi.boolean().optional(),
    'dropbox-root-permission': Joi.boolean().optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const addMemberValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  if (!req.params.member_id) {
    return response.invalidParam(
      res,
      'Validation error: "member_id" is required',
    );
  }
  next();
};

const addFollowerValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  if (!req.params.follower_id) {
    return response.invalidParam(
      res,
      'Validation error: "follower_id" is required',
    );
  }
  next();
};

const removeMemberValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  if (!req.params.member_id) {
    return response.invalidParam(
      res,
      'Validation error: "member_id" is required',
    );
  }
  next();
};

const removeFollowerValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  if (!req.params.follower_id) {
    return response.invalidParam(
      res,
      'Validation error: "follower_id" is required',
    );
  }
  next();
};

const searchValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    filter: Joi.string()
      .valid(
        'category',
        'popular',
        'active',
        'following',
        'member',
        'featured',
        'contributed',
      )
      .optional(),
    'sort-by': Joi.string()
      .valid(
        'featured',
        'alphabetical',
        'createdNewest',
        'popular',
        'createdOldest',
      )
      .optional(),
    term: Joi.string().optional(),
    category: Joi.string().optional(),
    'segment-id': Joi.string().allow(null).optional(),
    'is-manager': Joi.boolean().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getByIdValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  next();
};

const mySiteValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    filter: Joi.string()
      .valid(
        'category',
        'popular',
        'active',
        'following',
        'member',
        'featured',
        'contributed',
      )
      .optional(),
    'can-manage': Joi.boolean().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const updateSiteValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  const schema = Joi.object({
    access: Joi.string().valid('public', 'private').required(),
    name: Joi.string().required(),
    'category-id': Joi.string().required(),
    'has-pages': Joi.boolean().required(),
    'has-albums': Joi.boolean().required(),
    'has-events': Joi.boolean().required(),
    'has-content': Joi.boolean().required(),
    'is-question-answer-enabled': Joi.boolean().required(),
    'is-content-submissions-enabled': Joi.boolean().required(),
    'storage-provider': Joi.string().required(),
    'img-file': Joi.string().allow(null).required(),
    'is-broadcast': Joi.boolean().required(),
    'is-content-feed-enabled': Joi.boolean().required(),
    'site-id': Joi.string().required(),
    'landing-page': Joi.string()
      .valid('dashboard', 'feed', 'content', 'files', 'about')
      .optional(),
    'is-membership-auto-approved': Joi.boolean().optional(),
    'is-owner': Joi.boolean().optional(),
    'is-follower': Joi.boolean().optional(),
    'is-in-mandatory-subscription': Joi.boolean().optional(),
    'is-listed': Joi.boolean().optional(),
    'is-chatter-group-only': Joi.boolean().optional(),
    'is-active': Joi.boolean().optional(),
    'is-starred': Joi.boolean().optional(),
    'is-new': Joi.boolean().optional(),
    'is-public': Joi.boolean().optional(),
    'is-featured': Joi.boolean().optional(),
    'is-private': Joi.boolean().optional(),
    'is-access-requested': Joi.boolean().optional(),
    'is-restricted-category': Joi.boolean().optional(),
    'is-favorited': Joi.boolean().optional(),
    'is-content-manager': Joi.boolean().optional(),
    'is-member': Joi.boolean().optional(),
    'is-manager': Joi.boolean().optional(),
    'can-activate-deactivate': Joi.boolean().optional(),
    'can-edit': Joi.boolean().optional(),
    'can-create-album': Joi.boolean().optional(),
    'can-mention': Joi.boolean().optional(),
    'can-create-page': Joi.boolean().optional(),
    'can-create-event': Joi.boolean().optional(),
    'has-events-enabled': Joi.boolean().optional(),
    'has-pages-enabled': Joi.boolean().optional(),
    'has-dashboard': Joi.boolean().optional(),
    'has-album-enabled': Joi.boolean().optional(),
    'has-any-content-enabled': Joi.boolean().optional(),
    description: Joi.string().optional(),
    'dropbox-root-permission': Joi.boolean().optional(),
    'img-thumbnail': Joi.string().optional(),
    'information-title': Joi.string().optional(),
    information: Joi.string().optional(),
    slack: Joi.string().optional(),
    'chatter-group-id': Joi.string().optional(),
    'total-member-count': Joi.number().optional(),
    'follower-count': Joi.number().optional(),
    'member-count': Joi.number().optional(),
    team: Joi.boolean().optional(),
    id: Joi.string().optional(),
    'dash-board-layout': Joi.string().optional(),
    img: Joi.string().optional(),
    'cover-image': Joi.string().optional(),
    'manager-count': Joi.number().optional(),
    'people-count': Joi.number().optional(),
    'created-at': Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const activateValidator = (req, res, next) => {
  const schema = Joi.object({
    'ids-array': Joi.array().items(Joi.string().required()).required(),
    'make-activated-bool': Joi.boolean().required(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const getFilesByIdValidator = (req, res, next) => {
  const schema = Joi.object({
    'full-control': Joi.boolean().optional(),
    provider: Joi.string().required(),
    'sort-by': Joi.string().optional(),
    size: Joi.number().optional(),
    'folder-id': Joi.string().optional(),
    name: Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

module.exports = {
  createSiteValidator,
  addMemberValidator,
  addFollowerValidator,
  removeMemberValidator,
  removeFollowerValidator,
  searchValidator,
  getByIdValidator,
  mySiteValidator,
  updateSiteValidator,
  activateValidator,
  getFilesByIdValidator,
};
