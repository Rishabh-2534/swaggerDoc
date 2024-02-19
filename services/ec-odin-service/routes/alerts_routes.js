const express = require('express');

const alertsRouter = express.Router();

const middleware = require('../middlewares/middleware');
const alertsService = require('../services/alerts_service');
const alertsValidator = require('../validators/alertValidator');

/* API PREFIX : /api/alerts */

// Custom middlewares
alertsRouter.use(middleware.getAccessToken);
alertsRouter.use(middleware.getBaseUrl);
alertsRouter.use(middleware.parseRequestBody);

alertsRouter
  .route('/')
  .post(alertsValidator.createAlertValidator, alertsService.createAlert)
  .get(alertsValidator.getAlertValidator, alertsService.getAlert);

alertsRouter
  .route('/:alert_id')
  .put(alertsValidator.updateAlertValidator, alertsService.updateAlert)
  .delete(alertsService.deleteAlert);

module.exports = {
  alertsRouter,
};
