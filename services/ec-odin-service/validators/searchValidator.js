/* eslint-disable consistent-return */
const Joi = require('joi');

const utils = require('../utils/utils');

const searchBySectionValidator = (req, res, next) => {
  const schema = Joi.object({
    term: Joi.string().when('section', {
      is: 'Site',
      then: Joi.required(),
      otherwise: Joi.when('section', {
        is: 'Top',
        then: Joi.required(),
        otherwise: Joi.when('section', {
          is: 'GoogleDriveFile',
          then: Joi.required(),
          otherwise: Joi.when('section', {
            is: 'CrmFile',
            then: Joi.required(),
            otherwise: Joi.when('section', {
              is: 'Content',
              then: Joi.required(),
              otherwise: Joi.when('section', {
                is: 'OneDriveFile',
                then: Joi.required(),
                otherwise: Joi.when('section', {
                  is: 'SharePointFile',
                  then: Joi.required(),
                  otherwise: Joi.when('section', {
                    is: 'Confluence',
                    then: Joi.required(),
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    }),
    size: Joi.number().required(),
    section: Joi.string().valid(
      'File',
      'Site',
      'User',
      'Top',
      'GoogleDriveFile',
      'CrmFile',
      'ServiceNow',
      'Content',
      'Confluence',
      'OneDriveFile',
      'SharePointFile',
    ),
    'search-site': Joi.boolean().optional(),
    'is-correction-enabled': Joi.boolean().optional(),
    'drive-type': Joi.string().valid('shareddrive', 'mydrive').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const searchFeedValidator = (req, res, next) => {
  const schema = Joi.object({
    term: Joi.string().optional(),
    size: Joi.number().optional(),
    sort: Joi.string().valid('date', 'activity').optional(),
    type: Joi.string().allow(null).optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

module.exports = {
  searchBySectionValidator,
  searchFeedValidator,
};
