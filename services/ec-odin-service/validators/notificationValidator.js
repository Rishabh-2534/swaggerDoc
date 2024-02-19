const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const searchNotificationValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    filter: Joi.string().valid('activity', 'actionable').optional(),
    since: Joi.string().optional(),
    'include-actioned': Joi.boolean().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const createNotificationValidator = (req, res, next) => {
  const schema = Joi.object({
    url: Joi.string().required(),
    'property-name': Joi.string().valid('username', 'email').required(),
    'sent-to': Joi.when('property-name', {
      is: 'email',
      then: Joi.string().email().required(),
      otherwise: Joi.string().required(),
    }),
    'sent-by': Joi.when('property-name', {
      is: 'email',
      then: Joi.string().email().required(),
      otherwise: Joi.string().required(),
    }),
    'notification-type': Joi.string()
      .valid('Actionable', 'Information')
      .required(),
    comment: Joi.string().required(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

// eslint-disable-next-line consistent-return
const markAsActionedValidator = (req, res, next) => {
  if (!req.params.notification_id) {
    return response.invalidParam(
      res,
      'Validation error: "notification_id" is required',
    );
  }
  const schema = Joi.object({
    'property-name': Joi.string().valid('username', 'email').required(),
    'action-by': Joi.when('property-name', {
      is: 'email',
      then: Joi.string().email().required(),
      otherwise: Joi.string().required(),
    }),
    'action-at': Joi.string().required(),
    'is-deleted': Joi.boolean().optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

module.exports = {
  searchNotificationValidator,
  createNotificationValidator,
  markAsActionedValidator,
};
