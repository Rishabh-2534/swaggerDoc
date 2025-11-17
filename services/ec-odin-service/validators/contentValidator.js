/* eslint-disable consistent-return */
const Joi = require('joi');

const utils = require('../utils/utils');
const response = require('../utils/responses');

const deleteAlbumImagesValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'file-ids': Joi.array().items(Joi.string().required()).required(),
    provider: Joi.string().required(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const getPageByIdValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  next();
};

const getPageCategoriesValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    'sort-by': Joi.string().valid('createdNewest', 'createdOldest').optional(),
    'site-id': Joi.string().optional(),
    term: Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const getEventByIdValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  next();
};

const createPageValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'content-sub-type': Joi.string().valid('news', 'knowledge').required(),
    'publishing-status': Joi.string().valid('immediate', 'schedule').required(),
    'publish-at': Joi.string().when('publishing-status', {
      is: 'schedule',
      then: Joi.required(),
    }),
    'publish-to': Joi.string().allow(null).optional(),
    body: Joi.string().required(),
    summary: Joi.string().allow(null).optional(),
    title: Joi.string().required(),
    language: Joi.string().optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'category-name': Joi.string().required(),
    'original-file': Joi.any().optional(),
    'landscape-file': Joi.any().optional(),
    'list-of-files': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const updatePageValidator = (req, res, next) => {
  if (!req.params.site_id && !req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" and "content_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'authored-by': Joi.string().required(),
    'publish-at': Joi.string().required(),
    body: Joi.string(),
    summary: Joi.string().allow(null).optional(),
    title: Joi.string().required(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'category-name': Joi.string(),
    /* Fields might be used in the future */
    // 'content-sub-type': Joi.string().valid('news', 'knowledge'),
    // 'publishing-status': Joi.string().valid('immediate', 'schedule'),
    // 'publish-to': Joi.string().allow(null).optional(),
    // language: Joi.string().optional(),
    // 'is-feed-enabled': Joi.boolean().optional(),
    // 'original-file': Joi.any().optional(),
    // 'landscape-file': Joi.any().optional(),
    // 'list-of-files': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const createEventValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  const schema = Joi.object({
    'publish-at': Joi.string().required(),
    body: Joi.string().required(),
    'starts-at': Joi.string().required(),
    'is-all-day': Joi.boolean().optional(),
    'publishing-status': Joi.string().valid('immediate', 'schedule').optional(),
    'publish-to': Joi.string().allow(null).optional(),
    'ends-at': Joi.string().required(),
    'timezone-iso': Joi.string().required(),
    'has-directions': Joi.boolean().optional(),
    directions: Joi.array().items(Joi.string()).when('has-directions', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
    'has-rsvp': Joi.boolean().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    language: Joi.string().optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    'rsvp-due-at-date': Joi.string().allow(null).optional(),
    'rsvp-capacity-count': Joi.number().optional(),
    'rsvp-has-maybe-option': Joi.boolean().optional(),
    'rsvp-note-label': Joi.string().allow(null).optional(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'original-file': Joi.any().optional(),
    'landscape-file': Joi.any().optional(),
    'list-of-files': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const updateEventValidator = (req, res, next) => {
  if (!req.params.site_id && !req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" and "content_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'authored-by': Joi.string().required(),
    'publish-at': Joi.string().required(),
    // Check max length
    body: Joi.string(),
    // Add a better date time validation
    'starts-at': Joi.string().required(),
    'is-all-day': Joi.boolean().optional(),
    'ends-at': Joi.string().required(),
    'timezone-iso': Joi.string().required(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'has-rsvp': Joi.boolean().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    /* Fields might be used in the future */
    // 'has-directions': Joi.boolean().optional(),
    // directions: Joi.array().items(Joi.string()).when('has-directions', {
    //   is: true,
    //   then: Joi.required(),
    //   otherwise: Joi.strip(),
    // }),
    // 'publishing-status': Joi.string().valid('immediate', 'schedule').optional(),
    // 'publish-to': Joi.string().allow(null).optional(),
    // language: Joi.string().optional(),
    // 'is-feed-enabled': Joi.boolean().optional(),
    // 'rsvp-due-at-date': Joi.string().allow(null).optional(),
    // 'rsvp-capacity-count': Joi.number().optional(),
    // 'rsvp-has-maybe-option': Joi.boolean().optional(),
    // 'rsvp-note-label': Joi.string().allow(null).optional(),

    // 'has-map-url': Joi.boolean(),
    // 'map-url': Joi.string().allow(null).when('has-map-url', {
    //   is: true,
    //   then: Joi.required(),
    //   otherwise: Joi.strip(),
    // }),
    // 'original-file': Joi.any().optional(),
    // 'landscape-file': Joi.any().optional(),
    // 'list-of-files': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const searchValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional(),
    filter: Joi.string()
      .valid(
        'popular',
        'latest',
        'updates',
        'all',
        'managing',
        'owned',
        'author',
      )
      .optional(),
    'sort-by': Joi.string()
      .valid(
        'alphabetical',
        'createdNewest',
        'createdOldest',
        'publishedNewest',
        'publishedOldest',
        'modifiedNewest',
        'modifiedOldest',
      )
      .optional(),
    'site-id': Joi.string().optional(),
    'is-must-read': Joi.boolean().optional(),
    'people-id': Joi.string().optional(),
    'content-sub-type': Joi.string()
      .valid('news', 'knowledge', 'all')
      .optional(),
    type: Joi.string()
    .valid(
      'album',
      'page',
      'event',
      'blogpost',
    )
    .optional(),
    status: Joi.string()
      .valid(
        'all',
        'draft',
        'published',
        'pending',
        'rejected',
        'unpublished',
        'validationRequired',
        'validationExpired',
      )
      .optional(),
    category: Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const deleteContentValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  next();
};

const deleteEventValidator = (req, res, next) => {
  if (!req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "content_id" is required',
    );
  }
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required',
    );
  }
  next();
};

const getMustReadContentValidator = (req, res, next) => {
  const schema = Joi.object({
    'site-id': Joi.string().optional(),
    type: Joi.string().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getAllEventsValidator = (req, res, next) => {
  const schema = Joi.object({
    size: Joi.number().optional().max(50).message('Validation error: "size" must be less than or equal to 50'),
    filter: Joi.string().valid('future', 'past').optional(),
    period: Joi.string()
      .valid('this_week', 'this_month', 'next_week', 'after_this_month')
      .optional(),
    'authored-by': Joi.string().optional(),
    source: Joi.string().valid('all', 'following', 'rsvp').optional(),
    term: Joi.string().optional(),
    'next-page-token': Joi.number().optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};


const createAlbumValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'authored-by': Joi.string().optional(),
    'publishing-status': Joi.string().valid('immediate', 'schedule').required(),
    'publish-at': Joi.string().when('publishing-status', {
      is: 'schedule',
      then: Joi.required(),
    }),
    'list-of-files': Joi.array().items(Joi.any()).optional(),
    body: Joi.string().required(),
    'cover-image': Joi.any().optional(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    title: Joi.string().required(),
    summary: Joi.string().allow(null).optional(),
    'list-of-album-media': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const updateAlbumValidator = (req, res, next) => {
  if (!req.params.site_id || !req.params.content_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" and "content_id" is required as a path parameter',
    );
  }
  const schema = Joi.object({
    'authored-by': Joi.string().optional(),
    'publishing-status': Joi.string().valid('immediate', 'schedule').required(),
    'publish-at': Joi.string().when('publishing-status', {
      is: 'schedule',
      then: Joi.required(),
    }),
    'list-of-files': Joi.array().items(Joi.any()).optional(),
    body: Joi.string().required(),
    'cover-image': Joi.any().optional(),
    'list-of-topics': Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().allow(null).required(),
          name: Joi.string().required(),
        }),
      )
      .optional(),
    'is-feed-enabled': Joi.boolean().optional(),
    title: Joi.string().required(),
    summary: Joi.string().allow(null).optional(),
    'list-of-album-media': Joi.array().items(Joi.any()).optional(),
  });
  utils.validateRequest(req, res, next, schema, 1);
};

const fileUploadValidator = (req, res, next) => {
  if (!req.params.site_id) {
    return response.invalidParam(
      res,
      'Validation error: "site_id" is required as a path parameter',
    );
  }
  if (!req.listOfFiles) {
    return response.invalidParam(
      res,
      'Validation error: list-of-files field is required (should be of type file): "File" is required',
    );
  }

  next();
};

const fetchVideoMetaDataValidator = (req, res, next) => {
  const schema = Joi.object({
    'site-id': Joi.string().required(),
    size: Joi.number().integer().min(0).optional(),
    'sort-by': Joi.string()
      .valid(
        'createdNewest',
        'createdOldest',
        'modifiedNewest',
        'modifiedOldest',
        'alphabetical',
      )
      .optional(),
    directory: Joi.string().required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

module.exports = {
  getPageByIdValidator,
  getPageCategoriesValidator,
  getEventByIdValidator,
  createPageValidator,
  updatePageValidator,
  createEventValidator,
  updateEventValidator,
  searchValidator,
  deleteContentValidator,
  deleteEventValidator,
  getMustReadContentValidator,
  getAllEventsValidator,
  createAlbumValidator,
  updateAlbumValidator,
  deleteAlbumImagesValidator,
  fileUploadValidator,
  fetchVideoMetaDataValidator,
};
