require('dotenv').config();
const readline = require('readline');
const { connectToDB } = require('./db/db');
const oauth2ClientDetailsModel = require('./db/models/oauth2_client_details.model');
const { v4: uuid } = require('uuid');
const generatePassword = require('password-generator');
const { Sequelize } = require('sequelize');
const redisHelper = require('./utils/redis_helper');

const readFromConsole = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

const main = async () => {
  try {
    const env = process.env.NODE_ENV.toLocaleLowerCase();
    const {
      DB_HOST,
      DB_PORT,
      DB_PASSWORD,
      DB_USER,
      DB_NAME,
      REDIS_HOST,
      REDIS_PORT,
      REDIS_PASSWORD,
    } = process.env;

    if (['prod', 'dev', 'test', 'qa', 'perf'].indexOf(env) === -1) {
      console.log('Invalid env. Exiting...');
      return;
    }

    if (env === 'prod' || DB_HOST.indexOf('simpplr.com') !== -1) {
      const answer = await readFromConsole(
        'Are you sure you want to continue on production env? (y/n) '
      );
      if (answer.toLocaleLowerCase() !== 'y') {
        console.log('Exiting...');
        return;
      }
    }

    //connect to redis
    const redis = await redisHelper.connect({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    });

    // connect to database
    const db = await connectToDB({
      host: DB_HOST,
      port: DB_PORT,
      password: DB_PASSWORD,
      user: DB_USER,
      database: DB_NAME,
    });

    const OAuth2Client = oauth2ClientDetailsModel(db, Sequelize);

    const appName = await readFromConsole('Enter app name: ');
    const appDescription = await readFromConsole('Enter app description: ');
    const redirectURI = await readFromConsole('Enter rediret URL: ');

    const confirm = await readFromConsole(
      `Are you sure you want to continue? (y/n) with \n App Name: ${appName} \n App Description: ${appDescription} \n Redirect URI: ${redirectURI} \n on ${env} env? `
    );

    if (confirm.toLocaleLowerCase() === 'y') {
      const clientId = uuid();
      const clientSecret = generatePassword(32, false);
      // create a new OAuth2Client
      await OAuth2Client.create({
        app_id: uuid(),
        app_disp_name: appName,
        app_desc: appDescription,
        type: 'system',
        client_id: clientId,
        redirect_uri: redirectURI,
        auth_grant_type: 'Authorization Code',
        state_param_supported: true,
        account_id: '00000000-0000-0000-0000-000000000000',
      });

      const key = `oauthApp:${clientId}:${env}`;
      redisHelper.setKey(redis, key, { status: 'Y' });

      console.log(
        `Please find your app details in ${env} env below: \n app_id: ${clientId} \n app_secret: ${clientSecret} \n redirect_uri: ${redirectURI} \n\n\n
         Please get this saved to vault {identity-mgmt-app/${env}/runtime//Oauth2/ClientCredentials/${clientId}} with value {client_secret: ${clientSecret}}`
      );
    } else {
      console.log('Exiting without creating app...');
    }
  } catch (err) {
    console.log('error while creating app', err);
  }

  process.exit(0);
};

main();
