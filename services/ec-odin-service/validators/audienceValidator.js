const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const paramObjAddEditAudience = {
  type: Joi.string().valid('people', 'conditions').required(),
  name: Joi.string().required(),
  'list-of-people': Joi.array().when('type', {
    is: 'people',
    then: Joi.array().required().items(Joi.string().required()),
    otherwise: Joi.strip(),
  }),
  city: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  country: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  department: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  division: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  company: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  title: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  state: Joi.array().when('type', {
    is: 'conditions',
    then: Joi.array().items(Joi.string().optional()),
    otherwise: Joi.strip(),
  }),
  'hire-date': Joi.string().when('type', {
    is: 'conditions',
    then: Joi.string().optional(),
    otherwise: Joi.strip(),
  }),
  'hire-date-filter': Joi.string().valid(
    null,
    'hireDateBefore',
    'hireDateAfter',
  ),
};

const addAudienceValidator = (req, res, next) => {
  const schema = Joi.object(paramObjAddEditAudience);
  utils.validateRequest(req, res, next, schema, 1);
};

const deleteAudienceValidator = (req, res, next) => {
  if (!req.params.audience_id) {
    return response.invalidParam(
      res,
      'Validation error: "audience_id" is required',
    );
  }
  return next();
};

const editAudienceValidator = (req, res, next) => {
  if (!req.body['audience-id']) {
    return response.invalidParam(
      res,
      'Validation error: "audience_id" is required',
    );
  }
  paramObjAddEditAudience['audience-id'] = req.body['audience-id'];
  const schema = Joi.object(paramObjAddEditAudience);
  utils.validateRequest(req, res, next, schema, 1);
};

const uploadAudienceValidator = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Name of the audience is required',
    });
  }
  if (!req.files) {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Csv file is required',
    });
  }
  if (req.files.length > 1) {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Not more than 1 files are allowed',
    });
  }
  const fileName = req.files[0].filename;
  const parts = fileName.split('.');
  const fileExtension = parts[1];
  if (fileExtension !== 'csv') {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Uploaded file format should be csv.',
    });
  }
  next();
};

module.exports = {
  addAudienceValidator,
  deleteAudienceValidator,
  editAudienceValidator,
  uploadAudienceValidator,
};
