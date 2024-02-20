const express = require('express');

const notificationRouter = express.Router();

const middleware = require('../middlewares/middleware');
const notificationService = require('../services/notification_service');
const notificationValidator = require('../validators/notificationValidator');

// Custom middlewares
notificationRouter.use(middleware.getAccessToken);
notificationRouter.use(middleware.getBaseUrl);
notificationRouter.use(middleware.parseRequestBody);

notificationRouter
  .route('/')
  .get(
    notificationValidator.searchNotificationValidator,
    notificationService.search,
  )
  .post(
    notificationValidator.createNotificationValidator,
    notificationService.create,
  );
notificationRouter.put(
  '/:notification_id',
  notificationValidator.markAsActionedValidator,
  notificationService.markAsActioned,
);

module.exports = {
  notificationRouter,
};
