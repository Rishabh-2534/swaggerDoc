const utils = require('../utils/utils');
const response = require('../utils/responses');

/**
 * @function <b>createAlert</b> Create Alert
 * @return {Object}
 */
const createAlert = async (req, res) => {
  if (req.body['audience-id'] && req.body['audience-count']) {
    req.body.audience = {
      audienceId: req.body['audience-id'],
      audienceCount: req.body['audience-count'],
    };
    delete req.body['audience-id'];
    delete req.body['audience-count'];
  }
  const urn = utils.getRequestUrn('alerts', 'create');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

/**
 * @function <b>getAlert</b> Get Alert
 * @return {Object}
 */
const getAlert = async (req, res) => {
  const urn = utils.getRequestUrn('alerts', 'get');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

/**
 * @function <b>updateAlert</b> Update Alert
 * @return {Object}
 */
const updateAlert = async (req, res) => {
  let urn;
  let body = {};
  if (req.query.expire) {
    urn = utils.getRequestUrn('alerts', 'expire');
    body = req.params.alert_id;
  } else {
    urn = utils.getRequestUrn('alerts', 'update');
    body = {
      'item-data': req.body,
    };
    body.alertId = req.params.alert_id;
  }
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

/**
 * @function <b>deleteAlert</b> Delete Alert
 * @return {Object}
 */
const deleteAlert = async (req, res) => {
  if (!req.params.alert_id) {
    return response.invalidParam(
      res,
      'Validation error: "alert_id" is required',
    );
  }
  const body = req.params.alert_id;
  const urn = utils.getRequestUrn('alerts', 'delete');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  createAlert,
  getAlert,
  updateAlert,
  deleteAlert,
};
