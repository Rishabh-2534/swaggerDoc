const logger = require('./logger');

/*
    In case of errors, we get an HTML page
    Parse it and send the appropriate response
*/
const parseSfResponse = (response) => {
  let resultObj = {};
  const errorStr = response;
  if (
    typeof errorStr === 'string' &&
    errorStr.indexOf('<html') >= 0 &&
    errorStr.indexOf('</html>') >= 0
  ) {
    const indexOfErrorMsg = errorStr.indexOf('id="theErrorPage:theError"');
    resultObj.statusCode = 401;
    resultObj.status = 'error';
    if (indexOfErrorMsg >= 0) {
      let processStr = '';
      processStr = errorStr.substring(indexOfErrorMsg, errorStr.length);
      processStr = processStr.substring(
        processStr.indexOf('>') + 1,
        processStr.indexOf('</span>'),
      );
      resultObj.message = processStr;
      resultObj.i18nmessage = processStr;
    } else if (errorStr.indexOf('/visualforce/session') >= 0) {
      resultObj.message = 'SESSION_TIMEOUT';
      resultObj.i18nmessage = 'SESSION_TIMEOUT';
    } else {
      resultObj.statusCode = 400;
      // resultObj.message = '';
    }
  } else {
    try {
      resultObj = JSON.parse(response);
    } catch (err) {
      resultObj = response;
    }
  }
  delete resultObj.debugLogs;
  logger.debug('Exception in ParseSfResponse ', resultObj);
  return resultObj;
};

const getResponseObj = (result) => {
  const response = parseSfResponse(result);
  if (typeof response === 'string') {
    return {
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    };
  }
  if (response && typeof response === 'object') {
    if (response.status === 'success') {
      return {
        statusCode: response.statusCode || 200,
        status: 'success',
        message: response.message || '',
        data: response.result || {},
      };
    }
    if (response.status === 'error') {
      if (response.message === '404') {
        return {
          statusCode: 404,
          status: 'error',
          message: 'NOT_FOUND',
          data: {},
        };
      }
      return {
        statusCode: response.statusCode || 400,
        status: 'error',
        message: response.message || '',
        data: response.result || {},
      };
    }
    if (response.status === 'fail') {
      return {
        statusCode: response.statusCode || 422,
        status: 'fail',
        message: response.message || '',
        data: response.result || {},
      };
    }
  }
  return {
    statusCode: 200,
    status: 'success',
    message: '',
    data: { response },
  };
};

const mapingError = (res) => {
  const response = {
    statusCode: 500,
    status: 'error',
    message: 'Something went wrong.',
  };
  return res.status(500).send(response);
};

const invalidParam = (res, msg) => {
  const response = {
    statusCode: 400,
    status: 'error',
    message: msg || 'Please input a valid Request.',
  };
  return res.status(400).send(response);
};

const endRequestWithError = (res, statusCode, message, cb) => {
  res.statusCode = statusCode;
  if (message && message.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message }));
    if (cb) cb(new Error(message));
  } else {
    res.end();
    if (cb) cb(new Error(`Error with statusCode: ${statusCode}`));
  }
};

module.exports = {
  getResponseObj,
  mapingError,
  invalidParam,
  endRequestWithError,
  parseSfResponse,
};
