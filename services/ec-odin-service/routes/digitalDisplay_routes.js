const express = require('express');

const digitalDisplayRouter = express.Router();

const middleware = require('../middlewares/middleware');
const digitalDisplayValidator = require('../validators/digitalDisplayValidator');
const digitalDisplayService = require('../services/digitalDisplay_service');

// Custom middlewares
digitalDisplayRouter.use(middleware.getAccessToken);
digitalDisplayRouter.use(middleware.getBaseUrl);
digitalDisplayRouter.use(middleware.parseRequestBody);

digitalDisplayRouter.get(
  '/:type',
  digitalDisplayValidator.getCarouselValidator,
  digitalDisplayService.carousel,
);

module.exports = {
  digitalDisplayRouter,
};
