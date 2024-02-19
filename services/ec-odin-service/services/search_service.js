const utils = require('../utils/utils');
const response = require('../utils/responses');

/**
 * @function <b>searchBySection</b> Search By Section
 * @return {Object}
 */
const searchBySection = async (req, res) => {
  const body = { ...req.query };
  const urn = utils.getRequestUrn('search', `getBy${body.section}`);
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
 * @function <b>getAutocomplete</b> Get Auto Complete result
 * @return {Object}
 */
const getAutocomplete = async (req, res) => {
  const urn = utils.getRequestUrn('search', 'autocomplete');
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
 * @function <b>searchFeed</b> Search Feed
 * @return {Object}
 */
const searchFeed = async (req, res) => {
  const urn = utils.getRequestUrn('search', 'feed');
  if (!urn) {
    return response.mapingError(res);
  }
  req.query['subject-id'] = 'me';
  const resultObj = await utils.makeGetRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  searchBySection,
  getAutocomplete,
  searchFeed,
};
