const response = require('../utils/responses');
const constants = require('../config/constants');

const getCarouselValidator = (req, res, next) => {
  const { type } = req.params;
  if (!(type && constants.CAROUSEL_TYPE_LIST.includes(type))) {
    return response.invalidParam(
      res,
      'Validation error: type [Home, Site, Segment] parameter is required.',
    );
  }
  if (
    (type === 'Site' && !req.query['site-id']) ||
    (type === 'Segment' && !req.query['segment-id'])
  ) {
    return response.invalidParam(
      res,
      'Validation error: site-id is required for Site Carousels and segment-id is required for Segment carousels.',
    );
  }
  return next();
};

module.exports = {
  getCarouselValidator,
};
