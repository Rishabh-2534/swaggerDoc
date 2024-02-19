const express = require('express');
const probesRouter = express.Router();

probesRouter.get('/startUpProbe', (req, res) => {
  logger.debug(`inside startup probe ${Date.now()}`);
  
  return res.status(200).json({
    status: 'SUCCESS',
  });
});

probesRouter.get('/livenessProbe', (req, res) => {
  logger.debug(`inside livenessProbe ${Date.now()}`);
  
  return res.status(200).json({
    status: 'SUCCESS',
  });
});

probesRouter.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Successful',
  });
});

module.exports = {
  probesRouter,
};
