const Joi = require('joi').extend(require('@joi/date'));

const utils = require('../utils/utils');

const analyticsDateFormat = Joi.date()
  .format('YYYY-MM-DD')
  .raw()
  .messages({
    'date.format': 'Date format is YYYY-MM-DD',
  })
  .required();

const getAdoptionDataValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      /* Format of filter-value when filter-by is location
        => city@@state@@country => Gurugram@@Harayana@@india */
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getAdoptionAverageValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getAppPageViewsValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getAppAdoptionValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').optional(),
    'result-type': Joi.string().valid('department', 'location').required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getViewsListValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').optional(),
    'result-type': Joi.string().valid('department', 'location').optional(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getContentEngagementValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getContentPublicationsValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'only-published': Joi.boolean().required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getContentViewsByTypeValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getContentViewsListValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getContentReferralSourcesValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getKnowledgePageStatsValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getNewslettersValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSocialEngagementValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSocialEngagementListValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').required(),
    'result-type': Joi.string().valid('department', 'location').required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getCampaignsValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSearchesValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSearchListValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').optional(),
    type: Joi.string()
      .valid(
        'terms',
        'searchesZeroResults',
        'clickThroughTerms',
        'clickThroughTypes',
      )
      .required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSearchesPerfomedValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').optional(),
    type: Joi.string().valid('searches').required(),
    'result-type': Joi.string().valid('department', 'location').required(),
    'filter-by': Joi.string().valid(null, 'department', 'location').required(),
    'filter-value': Joi.string().when('filter-by', {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.strip(),
    }),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getPeopleOverviewValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getPeoplePerformanceValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    metric: Joi.string()
      .valid(
        'contentPublished',
        'favoritesReceived',
        'likesMade',
        'likesReceived',
        'feedPosts',
        'replies',
        'repliesFrom',
        'sharesReceived',
        'profileViews',
      )
      .required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getLowActivitySitesValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSitePopularityValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

const getSitePublicationsValidator = (req, res, next) => {
  const schema = Joi.object({
    from: analyticsDateFormat,
    to: analyticsDateFormat,
    'group-by': Joi.string().valid('day', 'week', 'month').optional(),
    'order-by': Joi.string().valid('top', 'bottom').required(),
  });
  utils.validateRequest(req, res, next, schema, 0);
};

module.exports = {
  getAdoptionDataValidator,
  getAdoptionAverageValidator,
  getAppPageViewsValidator,
  getAppAdoptionValidator,
  getViewsListValidator,
  getContentEngagementValidator,
  getContentPublicationsValidator,
  getContentViewsByTypeValidator,
  getContentViewsListValidator,
  getContentReferralSourcesValidator,
  getKnowledgePageStatsValidator,
  getNewslettersValidator,
  getSocialEngagementValidator,
  getSocialEngagementListValidator,
  getCampaignsValidator,
  getSearchesValidator,
  getSearchListValidator,
  getSearchesPerfomedValidator,
  getPeopleOverviewValidator,
  getPeoplePerformanceValidator,
  getLowActivitySitesValidator,
  getSitePopularityValidator,
  getSitePublicationsValidator,
};
