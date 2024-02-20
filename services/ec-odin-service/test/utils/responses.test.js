const responses = require('../../utils/responses');

// Test parseOfResponse
describe('Test parse of Response', () => {
  it('should parse the response if id="theErrorPage:theError" is in response', () => {
    const res = '<html><span>id="theErrorPage:theError"</span></html>';
    const result = responses.parseSfResponse(res);
    expect(result).toEqual({
      statusCode: 401,
      status: 'error',
      message: '</span>',
      i18nmessage: '</span>',
    });
  });
  it('should parse the response if /visualforce/session is in response', () => {
    const res = '<html><span>/visualforce/session</span></html>';
    const result = responses.parseSfResponse(res);
    expect(result).toEqual({
      statusCode: 401,
      status: 'error',
      message: 'SESSION_TIMEOUT',
      i18nmessage: 'SESSION_TIMEOUT',
    });
  });
  it('should parse the response when send only <html> Tag in response', () => {
    const res = '<html></html>';
    const result = responses.parseSfResponse(res);
    expect(result).toEqual({ statusCode: 400, status: 'error' });
  });
  it('should parse the response when send Oject in response', () => {
    const res = {
      statusCode: 200,
      status: 'success',
      message: 'Data',
      data: {},
    };
    const result = responses.parseSfResponse(res);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: 'Data',
      data: {},
    });
  });
  it('should parse the response when response is empty string', () => {
    const res = '';
    const result = responses.parseSfResponse(res);
    expect(result).toEqual('');
  });
});

// Test getResponseObj
describe('Test getResponseObj', () => {
  it('should get response Object when send <html><span>id="theErrorPage:theError"</span></html> in response', () => {
    const res = '<html><span>id="theErrorPage:theError"</span></html>';
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      statusCode: 401,
      status: 'error',
      message: '</span>',
      data: {},
    });
  });
  it('should get response Object when send <html></html> in response', () => {
    const res = '<html></html>';
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      statusCode: 400,
      status: 'error',
      message: '',
      data: {},
    });
  });
  it('should get error response Object with 400 error status when send an Object without statusCode in response', () => {
    const res = {
      status: 'error',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      statusCode: 400,
      status: 'error',
      message: '',
      data: {},
    });
  });

  it('should get response Object when send empty {} in response', () => {
    const res = {};
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: '',
      data: { response: {} },
    });
  });
  it('should get response Object when send String to response', () => {
    const res = 'Data';
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: 'Data',
      data: {},
    });
  });

  it('should get success response Object when send an Object to response', () => {
    const res = {
      status: 'success',
      statusCode: 201,
      message: 'Get response successfully',
      result: 'Data',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      status: 'success',
      statusCode: 201,
      message: 'Get response successfully',
      data: 'Data',
    });
  });
  it('should get success response Object when send an Object to response without statusCode', () => {
    const res = {
      status: 'success',
      statusCode: '',
      message: null,
      result: '',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      status: 'success',
      statusCode: 200,
      message: '',
      data: {},
    });
  });
  it('should get fail response Object when send an Object with fail status in response', () => {
    const res = {
      status: 'fail',
      statusCode: 500,
      message: 'Server issue',
      result: 'Failed',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      status: 'fail',
      statusCode: 500,
      message: 'Server issue',
      data: 'Failed',
    });
  });
  it('should get fail response Object when send an Object with fail status and none value in statusCode response', () => {
    const res = {
      status: 'fail',
      statusCode: '',
      message: '',
      result: '',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      status: 'fail',
      statusCode: 422,
      message: '',
      data: {},
    });
  });
  it('should get error response Object when send an Object with 404 statusCode in response', () => {
    const res = {
      status: 'error',
      statusCode: 404,
      message: '404',
    };
    const result = responses.getResponseObj(res);
    expect(result).toEqual({
      status: 'error',
      statusCode: 404,
      message: 'NOT_FOUND',
      data: {},
    });
  });
});

// Test Maping Error
describe('Test Maping Error', () => {
  it('should return maping error object', () => {
    const response = {
      status: () => ({
        send: () => ({
          statusCode: 500,

          status: 'error',

          message: 'Something went wrong.',
        }),
      }),
    };
    const result = responses.mapingError(response);
    expect(result).toEqual({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  });
});

// Test Invalid param
describe('Test Invalid param', () => {
  it('should return Invalid param object when msg is falsy value', () => {
    const response = {
      status: () => ({
        send: () => ({
          statusCode: 401,
          status: 'error',
          message: 'Please input a valid Request.',
        }),
      }),
    };
    const result = responses.invalidParam(response);
    expect(result).toEqual({
      statusCode: 401,
      status: 'error',
      message: 'Please input a valid Request.',
    });
  });
  it('should return Invalid param object', () => {
    const msg = 'Input is incorrect';
    const response = {
      status: () => ({
        send: () => ({
          statusCode: 401,
          status: 'error',
          message: msg,
        }),
      }),
    };
    const result = responses.invalidParam(response, msg);
    expect(result).toEqual({
      statusCode: 401,
      status: 'error',
      message: msg,
    });
  });
});

// Test endRequestWithError
describe('Test endRequestWithError', () => {
  it('should set header when message is truthy value and cb is truthy value', () => {
    const response = {
      setHeader: () => 0,
      end: () => 0,
    };
    const statusCode = 200;
    const message = 'Data';
    const cb = () => 0;

    responses.endRequestWithError(response, statusCode, message, cb);
  });

  it('should test endRequestWithError when message is falsy value ', () => {
    const response = {
      setHeader: () => {},
      end: () => {},
    };
    const statusCode = 200;
    const message = null;
    responses.endRequestWithError(response, statusCode, message);
  });
  it('should test endRequestWithError when message is falsy value and callback has truthy value', () => {
    const response = {
      setHeader: () => {},
      end: () => {},
    };
    const statusCode = 200;
    const message = null;
    const cb = () => 0;
    responses.endRequestWithError(response, statusCode, message, cb);
  });
});
