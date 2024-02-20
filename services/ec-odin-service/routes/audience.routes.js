const express = require('express');

const audienceRouter = express.Router();

const middleware = require('../middlewares/middleware');
const audienceService = require('../services/audience_service');
const audienceValidator = require('../validators/audienceValidator');

// Custom middlewares
audienceRouter.use(middleware.getAccessToken);
audienceRouter.use(middleware.getBaseUrl);
audienceRouter.use(middleware.parseRequestBody);

audienceRouter.post(
  '/upload',
  audienceValidator.uploadAudienceValidator,
  audienceService.uploadAudience,
);

audienceRouter.delete(
  '/:audience_id',
  audienceValidator.deleteAudienceValidator,
  audienceService.deleteAudience,
);

audienceRouter
  .route('/')
  .post(
    audienceValidator.addAudienceValidator,
    audienceService.addOrEditAudience,
  )
  .put(
    audienceValidator.editAudienceValidator,
    audienceService.addOrEditAudience,
  );

module.exports = {
  audienceRouter,
};
