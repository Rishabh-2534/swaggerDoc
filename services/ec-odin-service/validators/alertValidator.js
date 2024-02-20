const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const getAlertValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    filter: Joi.string()
      .valid('all', 'active', 'axpired', 'scheduled')
      .optional(),
    'sort-by': Joi.string()
      .valid(
        'createdNewest',
        'createdOldest',
        'displayFromNewest',
        'displayFromOldest',
        'displayToNewest',
        'displayToOldest',
      )
      .optional(),
    recipient: Joi.string().optional(),
    term: Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const createAlertValidator = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().required(),
    'display-from': Joi.string().required(),
    'display-to': Joi.string().required(),
    'segment-id': Joi.string().allow(null).when('recipient', {
      is: 'segment',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'is-dismissible': Joi.boolean().required(),
    'has-url': Joi.boolean().required(),
    recipient: Joi.string()
      .valid('everyone', 'audience', 'site', 'segment')
      .required(),
    'members-type': Joi.string().when('recipient', {
      is: 'site',
      then: Joi.valid('site_members_and_followers', 'site_members').required(),
      otherwise: 'site_members_and_followers',
    }),
    url: Joi.string().when('has-url', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'audience-id': Joi.string().when('recipient', {
      is: 'audience',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'audience-count': Joi.number().when('recipient', {
      is: 'audience',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'site-id': Joi.string().when('recipient', {
      is: 'site',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

// eslint-disable-next-line consistent-return
const updateAlertValidator = (req, res, next) => {
  if (!req.params.alert_id) {
    return response.invalidParam(
      res,
      'Validation error: "alert_id" is required',
    );
  }
  if (req.query.expire) {
    return next();
  }
  const schema = Joi.object({
    message: Joi.string().required(),
    'display-to': Joi.string().optional(),
    'segment-id': Joi.string().allow(null).when('recipient', {
      is: 'segment',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'is-dismissible': Joi.boolean().required(),
    'has-url': Joi.boolean().required(),
    recipient: Joi.string().valid('everyone', 'audience', 'site', 'segment'),
    url: Joi.string().when('has-url', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'audience-id': Joi.string().when('recipient', {
      is: 'audience',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'site-id': Joi.string().when('recipient', {
      is: 'site',
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

module.exports = {
  getAlertValidator,
  createAlertValidator,
  updateAlertValidator,
};
