const utils = require('../utils/utils');
const response = require('../utils/responses');

const search = async (req, res) => {
  const urn = utils.getRequestUrn('notifications', 'search');
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

const create = async (req, res) => {
  const urn = utils.getRequestUrn('notifications', 'create');
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

const markAsActioned = async (req, res) => {
  const urn = utils.getRequestUrn('notifications', 'markAsActioned');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&notificationId=${req.params.notification_id
    }`;
  const resultObj = await utils.makePostRequest(
    uri,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  search,
  create,
  markAsActioned,
};
