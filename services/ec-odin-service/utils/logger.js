const pino = require('pino');
const logger = require('pino-caller')(
  pino({
    level: process.env.NODE_ENV === 'development' ? 'trace' : 'trace',
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            destination: '/var/log/api-gateway-n/app.log',
            colorize: true,
          },
        },
        {
          target: 'pino/file',
          options: { destination: 1 },
        },
      ],
    },
  }),
  {
    relativeTo: __dirname,
  },
);

// const logger = require('pino-caller')(
//   require('pino')({
//     level: process.env.NODE_ENV === 'development' ? 'trace' : 'trace',
//     timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
//   }),
//   {
//     relativeTo: __dirname,
//   },
// );

module.exports = logger;
