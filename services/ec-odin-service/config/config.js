const config = {
  ENV: 'PRODUCTION',
  PRODUCTION: {
    CLIENT_ID:
      '3MVG9xOCXq4ID1uEnQ5w_SQi9IC7QKCVJzXLGkUQ_8Wa1btX7cSNs1ilaxdLfZTVbrrr9pf9zjKO2f3wLhnsr',
    CLIENT_SECRET:
      'BED32CB7999D0F60D3742D44EC1E1BB10D0A7E216E8CE448E8E85A06A23188D5',
    REDIRECT_URI: 'https://api.ec.simpplr.com/api/auth/oauth2/callback',
    SANDBOX_LOGIN_URL: 'https://test.salesforce.com',
    PROD_LOGIN_URL: 'https://login.salesforce.com',
    SERVER_PORT: 3000,
    API_SERVICE_PORT: 3001,
    README_ANALYTICS_APIKEY: 'IZqEoT0i4L67Rinj0WwzPYqWsGkipSg9',
    README_JWT_SECRET: 'DcYIHphGDVLJyKWqErOY',
    README_URL: 'https://developer.simpplr.com/',
    DOMAIN_NAME: 'https://api.ec.simpplr.com',
    ORG_INFO_URL: 'https://api.simpplr.com/mobile/verify-domain',
    ORG_INFO_ENCRYPTION_KEY: '0123456701',
  },
  STAGING: {
    CLIENT_ID:
      '3MVG9xOCXq4ID1uEnQ5w_SQi9IC7QKCVJzXLGkUQ_8Wa1btX7cSNs1ilaxdLfZTVbrrr9pf9zjKO2f3wLhnsr',
    CLIENT_SECRET:
      'BED32CB7999D0F60D3742D44EC1E1BB10D0A7E216E8CE448E8E85A06A23188D5',
    REDIRECT_URI: 'https://staging.api.ec.simpplr.com/api/auth/oauth2/callback',
    SANDBOX_LOGIN_URL: 'https://test.salesforce.com',
    PROD_LOGIN_URL: 'https://login.salesforce.com',
    SERVER_PORT: 3000,
    API_SERVICE_PORT: 3001,
    README_ANALYTICS_APIKEY: 'IZqEoT0i4L67Rinj0WwzPYqWsGkipSg9',
    README_JWT_SECRET: 'e9cVmihDpizxtTEHBdSC',
    README_URL: 'https://developer.simpplr.com/',
    DOMAIN_NAME: 'https://staging.api.ec.simpplr.com',
    ORG_INFO_URL: 'https://staging.api.simpplr.com/mobile/verify-domain',
    ORG_INFO_ENCRYPTION_KEY: '0123456701',
  },
  DEVELOPMENT: {
    CLIENT_ID:
      '3MVG9cHH2bfKACZY2bJSsIJGFQlBTpiwcGCagYkixXG0MUtFZ1HtMXZRjE_0HivqfHEuizIhADOMsAWi9.rmf',
    CLIENT_SECRET:
      '1220030CFDA594B530B81B3873F30F21D0938111BC6D22893A740960A032D4A3',
    REDIRECT_URI: 'https://dev.api.ec.simpplr.com/api/auth/oauth2/callback',
    SANDBOX_LOGIN_URL: 'https://test.salesforce.com',
    PROD_LOGIN_URL: 'https://login.salesforce.com',
    SERVER_PORT: 3000,
    API_SERVICE_PORT: 3001,
    README_ANALYTICS_APIKEY: 'IZqEoT0i4L67Rinj0WwzPYqWsGkipSg9',
    README_JWT_SECRET: 'e9cVmihDpizxtTEHBdSC',
    README_URL: 'https://developer.simpplr.com/',
    DOMAIN_NAME: 'https://dev.api.ec.simpplr.com',
    ORG_INFO_URL: 'https://development.api.simpplr.com/mobile/verify-domain',
    ORG_INFO_ENCRYPTION_KEY: '0123456701',
  },
};

module.exports = config;
