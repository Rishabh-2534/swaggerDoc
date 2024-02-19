const getRequestResponse = {
  status: 'Success',
  statusCode: 200,
  message: 'Recieve Response Successfully',
};
const postRequestResponse = {
  status: 'Success',
  statusCode: 200,
  message: 'Recieve Response Successfully',
};
const mapingErrorResponse = {
  statusCode: 500,
  status: 'error',
  message: 'Something went wrong.',
};
const promiseRejectResponse = {
  statusCode: 400,
  status: 'error',
  message: 'Async Error.',
};
const invalidParamResponse = {
  statusCode: 401,
  status: 'error',
  message: 'Please input a valid Request.',
};
const getRequestResponseFileUpload = {
  status: 'success',
  statusCode: '200',
  data: {
    response: {
      records: {
        0: {
          ContentDocumentId: '123',
          ContentSize: 10,
          FileType: 'any',
          Title: 'Data',
        },
      },
    },
  },
  message: 'Data from SF',
};
const postRequestResponseFileUpload = {
  status: 'success',
  statusCode: 200,
  data: {
    response: {
      id: 123,
      success: 'true',
    },
  },
  message: 'successfully hit SF',
};

const gotResponse = {
  data: {
    response: {},
  },
  message: '',
  status: 'success',
  statusCode: 200,
};

const videoMetaDataResponse = {
  status: 'success',
  statusCode: '200',
  data: {
    listOfItems: [{ isVideo: true }],
  },
};

module.exports = {
  getRequestResponse,
  postRequestResponse,
  mapingErrorResponse,
  promiseRejectResponse,
  invalidParamResponse,
  getRequestResponseFileUpload,
  postRequestResponseFileUpload,
  gotResponse,
  videoMetaDataResponse,
};
