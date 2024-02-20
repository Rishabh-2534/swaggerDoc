const utils = require('../utils/utils');
const response = require('../utils/responses');
const constants = require('../config/constants');

const carousel = async (req, res) => {
  if (
    !req.params.type ||
    !constants.CAROUSEL_TYPE_LIST.includes(req.params.type)
  ) {
    return response.invalidParam(res, 'Please pass a valid Type to proceed.');
  }
  const urn = utils.getRequestUrn(
    'digitalDisplay',
    req.params.type.toLowerCase(),
  );
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

module.exports = {
  carousel,
};
