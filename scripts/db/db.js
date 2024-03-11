const Sequelize = require('sequelize');
exports.connectToDB = async ({ host, user, password, database }) => {
  return new Sequelize(database, user, password, {
    host,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
};
