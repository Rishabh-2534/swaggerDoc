const redis = require('redis');
const RedisClustr = require('redis-clustr');

/* Promise to connect to Redis cluster */
exports.connect = async ({ host, port, password }) => {
  console.log('started connecting to redis client');
  const redisServer = [];

  redisServer.push({
    host: host,
    port: port,
  });

  return new Promise((resolve, reject) => {
    //redis client
    const redisClusterClient = new RedisClustr({
      servers: redisServer,
      createClient: function (port, host, options) {
        return redis.createClient(port, host, options);
      },
      redisOptions: {
        password: password,
        tls: {},
      },
    });

    redisClusterClient.on('connect', function () {
      console.log('connect evt from redis cluster');
    });

    redisClusterClient.on('ready', function () {
      console.log('ready event from redis cluster');
    });

    redisClusterClient.on('fullReady', function () {
      console.log('fullReady event from redis cluster');
      resolve(redisClusterClient);
    });
    redisClusterClient.on('error', function (err) {
      console.log('error event from redis cluster');
      reject(err);
    });
  });
};

/* Promise to disconnect from Redis client */
exports.disconnect = (redisClient) => {
  if (redisClient != undefined) {
    return new Promise((resolve, reject) => {
      redisClient.quit(function (err, result) {
        console.log('quit callback');
        if (err) reject(err);
        resolve(result);
      });

      redisClient.on('error', function (error) {
        console.log(JSON.stringify(error));
        reject(error);
      });
    });
  }
};

/* Promise to get a key from Redis client */
exports.getKey = async (redisClient, key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (err, reply) {
      console.log('getting data for key ' + key);
      if (err) reject(err);
      resolve(reply);
    });
  });
};

/* Promise to set a key in Redis client */
exports.setKey = async (redisClient, key, value, key_expiry) => {
  console.log({ key, value, key_expiry });

  return new Promise((resolve, reject) => {
    redisClient.set(key, value, function (err, result) {
      console.log('setting data in redis');
      if (err) reject(err);
      if (key_expiry) {
        redisClient.expire(key, key_expiry, function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
      }
      resolve(result);
    });
  });
};
