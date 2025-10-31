/* eslint-disable consistent-return */
const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const getPeopleValidator = (req, res, next) => {
  const schema = Joi.object({
    'search-param': Joi.string()
      .valid(
        'Department',
        'Location',
        'Expertise',
        'PeopleID',
        'SfUserID',
        null,
      )
      .optional(),
    'people-id': Joi.when('search-param', {
      is: 'PeopleID',
      then: Joi.string().required(),
      otherwise: Joi.strip(),
    }),
    'sf-user-id': Joi.when('search-param', {
      is: 'SfUserID',
      then: Joi.string().required(),
      otherwise: Joi.strip(),
    }),
    size: Joi.number().when('search-param', {
      is: 'SfUserID',
      then: Joi.strip(),
      otherwise: Joi.when('search-param', {
        is: 'PeopleID',
        then: Joi.strip(),
        otherwise: Joi.required(),
      }),
    }),
    term: Joi.string()
      .allow(null)
      .when('search-param', {
        is: 'SfUserID',
        then: Joi.strip(),
        otherwise: Joi.when('search-param', {
          is: 'PeopleID',
          then: Joi.strip(),
          otherwise: Joi.required(),
        }),
      }),
    department: Joi.string()
      .allow(null)
      .when('search-param', {
        is: 'SfUserID',
        then: Joi.strip(),
        otherwise: Joi.when('search-param', {
          is: 'PeopleID',
          then: Joi.strip(),
        }),
      }),
    location: Joi.string()
      .allow(null)
      .when('search-param', {
        is: 'SfUserID',
        then: Joi.strip(),
        otherwise: Joi.when('search-param', {
          is: 'PeopleID',
          then: Joi.strip(),
        }),
      }),
    'user-category': Joi.string()
      .allow(null)
      .when('search-param', {
        is: 'SfUserID',
        then: Joi.strip(),
        otherwise: Joi.when('search-param', {
          is: 'PeopleID',
          then: Joi.strip(),
        }),
      }),
    expertise: Joi.string()
      .allow(null)
      .when('search-param', {
        is: 'SfUserID',
        then: Joi.strip(),
        otherwise: Joi.when('search-param', {
          is: 'PeopleID',
          then: Joi.strip(),
        }),
      }),
    'limit-to-subsegment': Joi.boolean().when('search-param', {
      is: 'SfUserID',
      then: Joi.strip(),
      otherwise: Joi.when('search-param', {
        is: 'PeopleID',
        then: Joi.strip(),
      }),
    }),
    'sort-by': Joi.string().when('search-param', {
      is: 'SfUserID',
      then: Joi.strip(),
      otherwise: Joi.when('search-param', {
        is: 'PeopleID',
        then: Joi.strip(),
      }),
    }),
    'include-total': Joi.boolean().when('search-param', {
      is: 'SfUserID',
      then: Joi.strip(),
      otherwise: Joi.when('search-param', {
        is: 'PeopleID',
        then: Joi.strip(),
      }),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};
const updatePeopleSettingsValidator = (req, res, next) => {
  const schema = Joi.object({
    aboutme: Joi.string().allow(null).optional(),
    'company-name': Joi.string().allow(null).optional(),
    'custom-user-field-list': Joi.array().allow(null).optional(),
    extension: Joi.string().allow(null).optional(),
    'joining-date': Joi.string().allow(null).optional(),
    manager: Joi.string().allow(null).optional(),
    'people-category-id': Joi.string().allow(null).optional(),
    'salesforce-language-locale-key': Joi.string().allow(null).optional(),
    'simpplr-language-locale-key': Joi.string().allow(null).optional(),
    'time-zone': Joi.string().allow(null).optional(),
    'zoom-id': Joi.string().allow(null).optional(),
    'birthday-month': Joi.string().allow(null).optional(),
    city: Joi.string().allow(null).optional(),
    country: Joi.string().allow(null).optional(),
    department: Joi.string().allow(null).optional(),
    division: Joi.string().allow(null).optional(),
    'first-name': Joi.string().allow(null).optional(),
    'last-name': Joi.string().allow(null).optional(),
    mobile: Joi.string().allow(null).optional(),
    phone: Joi.string().allow(null).optional(),
    state: Joi.string().allow(null).optional(),
    street: Joi.string().allow(null).optional(),
    title: Joi.string().allow(null).optional(),
    'user-category': Joi.string().allow(null).optional(),
  });
  if (!req.params.people_id) {
    return response.invalidParam(
      res,
      'Validation error: "people_id" is required',
    );
  }
  utils.validateRequest(req, res, next, schema, 1);
};

module.exports = {
  updatePeopleSettingsValidator,
  getPeopleValidator,
};
