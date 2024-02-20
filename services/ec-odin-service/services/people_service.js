const utils = require('../utils/utils');
const response = require('../utils/responses');

/**
 * @function <b>getPeople</b> Get People
 * @return {Object}
 */
const getPeople = async (req, res) => {
  let urn;
  const body = { ...req.query };
  const validSearchParam = ['Department', 'Location', 'Expertise'];
  if (!body['search-param']) {
    urn = utils.getRequestUrn('people', 'default');
  } else {
    switch (body['search-param']) {
      case 'PeopleID':
        urn = utils.getRequestUrn('people', 'getById');
        if (!body['people-id']) {
          return response.invalidParam(res, 'Please pass a valid People ID.');
        }
        break;
      case 'SfUserID':
        urn = utils.getRequestUrn('people', 'getById');
        if (!body['sf-user-id']) {
          return response.invalidParam(res, 'Please pass a valid Sf User-ID.');
        }
        break;
      default:
        urn = validSearchParam.includes(body['search-param'])
          ? utils.getRequestUrn('people', `getBy${body['search-param']}`)
          : utils.getRequestUrn('people', 'default');
        delete body['search-param'];
    }
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
 * @function <b>updatePeopleSettings</b> Update People Settings
 * @return {Object}
 */
const updatePeopleSettings = async (req, res) => {
  const urn = utils.getRequestUrn('people', 'updatePeopleSettings');
  if (!urn) {
    return response.mapingError(res);
  }
  req.body.peopleId = req.params.people_id;
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

module.exports = {
  getPeople,
  updatePeopleSettings,
};
