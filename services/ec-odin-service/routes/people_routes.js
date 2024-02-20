const express = require('express');

const peopleRouter = express.Router();

const middleware = require('../middlewares/middleware');
const peopleService = require('../services/people_service');
const peopleValidator = require('../validators/peopleValidator');

/* API PREFIX : /api/people */

// Custom middlewares
peopleRouter.use(middleware.getAccessToken);
peopleRouter.use(middleware.getBaseUrl);
peopleRouter.use(middleware.parseRequestBody);

peopleRouter.get(
  '/',
  peopleValidator.getPeopleValidator,
  peopleService.getPeople,
);
peopleRouter.put(
  '/:people_id',
  peopleValidator.updatePeopleSettingsValidator,
  peopleService.updatePeopleSettings,
);

module.exports = {
  peopleRouter,
};
