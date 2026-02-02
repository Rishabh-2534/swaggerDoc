/* eslint-disable no-nested-ternary */
const express = require('express');
const readme = require('readmeio');
const cors = require('cors');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../config/swagger.json');

const { pingRouter } = require('./routes/ping_routes');
const { authRouter } = require('./routes/auth_routes');
const { siteRouter } = require('./routes/site_routes');
const { alertsRouter } = require('./routes/alerts_routes');
const { peopleRouter } = require('./routes/people_routes');
const { blogsRouter } = require('./routes/blogs_routes');
const { searchRouter } = require('./routes/search_routes');
const { contentRouter } = require('./routes/content_routes');
const { notificationRouter } = require('./routes/notification_routes');
const { digitalDisplayRouter } = require('./routes/digitalDisplay_routes');
const { analyticsRouter } = require('./routes/analytics_routes');
const { audienceRouter } = require('./routes/audience.routes');
const { probesRouter } = require('./routes/probes.routes');
const logger = require('./utils/logger'); // logger - API GATEWAY LOGGER
const config = require('./config/config');
const middleware = require('./middlewares/middleware');
const apiRateLimiter = require('./middlewares/api_rate_limiter');
const apiRouter = express.Router();

const conf = config[config.ENV];

app.enable('trust proxy');
app.use(cors());

app.use(requestIp.mw());
app.use((req, res, next) => {
  req.ip = req.clientIp;
  next();
});
app.use(apiRateLimiter.rateLimiterMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(middleware.logRequestParams);
app.set('view engine', 'ejs');

app.use(
  readme.metrics(
    conf.README_ANALYTICS_APIKEY,
    (req) => ({
      apiKey: conf.README_ANALYTICS_APIKEY,
      label: req.headers['x-simpplr-domain']
        ? req.headers['x-simpplr-domain']
        : 'Simpplr API Analytics',
      email: 'analytics@simpplr.com',
    }),
    {
      development: process.env.NODE_ENV === 'development', // optional, sends logs to Development Data
      baseLogUrl: 'https://developer.simpplr.com/',       // optional This is the base URL for your ReadMe project. 
    },
  ),
);

// TODO: Build a custom middleware to extract access_token and prepare req body
// TODO: Develop a custom middleware to get SF URL and Environment
// TODO: Request schema validation (may be Joi??)

app.use('/', probesRouter);
apiRouter.use('/ping', pingRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/sites', siteRouter);
apiRouter.use('/people', peopleRouter);
apiRouter.use('/blogs', blogsRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/alerts', alertsRouter);
apiRouter.use('/contents', contentRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/carousels', digitalDisplayRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/audience', audienceRouter);

app.use('/api', apiRouter);

app.listen(conf.API_SERVICE_PORT, () => {
  logger.info(
    `API Service listening at http://localhost:${conf.API_SERVICE_PORT}`,
  );
});
