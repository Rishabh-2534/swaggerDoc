const express = require('express');

const pingRouter = express.Router();

pingRouter.get('/', (req, res) => res.status(200).send({}));

module.exports = {
  pingRouter,
};
