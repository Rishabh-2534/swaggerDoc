const express = require('express');

const searchRouter = express.Router();

const middleware = require('../middlewares/middleware');
const searchService = require('../services/search_service');
const searchValidator = require('../validators/searchValidator');

/* API PREFIX : /api/search */

// Custom middlewares
searchRouter.use(middleware.getAccessToken);
searchRouter.use(middleware.getBaseUrl);
searchRouter.use(middleware.parseRequestBody);

searchRouter.get(
  '/',
  searchValidator.searchBySectionValidator,
  searchService.searchBySection,
);
searchRouter.get('/autocomplete', searchService.getAutocomplete);
searchRouter.get(
  '/feed',
  searchValidator.searchFeedValidator,
  searchService.searchFeed,
);

module.exports = {
  searchRouter,
};
