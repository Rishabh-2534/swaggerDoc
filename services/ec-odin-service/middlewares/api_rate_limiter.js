const { RateLimiterMemory } = require('rate-limiter-flexible');
const constants = require('../config/constants');

const rateLimiter = new RateLimiterMemory({
  points: constants.IP_LIMIT,
  duration: constants.API_TIME_LIMIT, // in seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip, 1) // Consume 1 points
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too many requests, please try again later');
    });
};

module.exports = { rateLimiterMiddleware };
