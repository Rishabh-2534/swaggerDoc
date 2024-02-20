const express = require('express');

const authRouter = express.Router();
const jsforce = require('jsforce');
const path = require('path');

const utils = require('../utils/utils');
const config = require('../config/config');
const logger = require('../utils/logger');

const conf = config[config.ENV];

authRouter.use('/public', express.static(path.join(__dirname, '../public')));
const oauthObj = {
  clientId: conf.CLIENT_ID,
  clientSecret: conf.CLIENT_SECRET,
  redirectUri: conf.REDIRECT_URI,
};

authRouter.get('/home', (req, res) => {
  res.render('home', { domainName: conf.DOMAIN_NAME });
});

authRouter.get('/login', (req, res) => {
  if (req.query.type === 'sandbox' || req.query.state === 'sandbox') {
    oauthObj.loginUrl = conf.SANDBOX_LOGIN_URL;
  } else {
    oauthObj.loginUrl = conf.PROD_LOGIN_URL;
  }
  const oauth2 = new jsforce.OAuth2(oauthObj);
  res.redirect(oauth2.getAuthorizationUrl({ state: req.query.type }));
});

authRouter.get('/oauth2/callback', async (req, res) => {
  logger.info(`Request query is : ${req.query}`);
  let accessToken = '';
  let email = '';
  let userName = '';
  let conn = {};
  if (req.query.type === 'sandbox' || req.query.state === 'sandbox') {
    oauthObj.loginUrl = conf.SANDBOX_LOGIN_URL;
  } else {
    oauthObj.loginUrl = conf.PROD_LOGIN_URL;
  }
  const oauth2 = new jsforce.OAuth2(oauthObj);
  try {
    conn = new jsforce.Connection({ oauth2 });
  } catch (err) {
    logger.error(`Exception in AuthRouter : ${err}`);
    return res
      .status(500)
      .send({ status: 'error', message: 'Something went wrong!' });
  }
  const { code } = req.query;
  await conn.authorize(code, (err, userInfo) => {
    if (err) {
      logger.error(`Exception in AuthRouter : ${err}`);
      return console.error(err);
    }
    logger.info(`UserInfo in AuthRouter is : ${userInfo}`);
    accessToken = conn.accessToken;
    return null;
  });
  await conn.identity((err, resp) => {
    if (err) {
      logger.error(`Exception in AuthRouter : ${err}`);
      return console.error(err);
    }
    email = resp.username;
    userName = resp.display_name;
    return null;
  });
  const redirectUri = utils.getRedirectUri(accessToken, userName, email);
  return res.redirect(redirectUri);
});

module.exports = {
  authRouter,
};
