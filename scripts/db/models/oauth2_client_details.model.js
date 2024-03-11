/* This is the Sequelize model for oauth_client_details table */
const oauth2ClientDetailsModel = (database, type) =>
  database.define(
    'oauth2_client_details',
    {
      id: {
        type: type.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      app_id: {
        type: type.STRING,
        allowNull: false,
      },
      account_id: {
        type: type.UUID,
        allowNull: true,
      },
      app_disp_name: {
        type: type.STRING,
        allowNull: false,
      },
      app_desc: {
        type: type.STRING,
        allowNull: false,
      },
      type: {
        type: type.STRING,
        allowNull: false,
      },
      client_id: {
        type: type.STRING,
        allowNull: false,
      },
      client_secret: {
        type: type.STRING,
        allowNull: true,
      },
      redirect_uri: {
        type: type.STRING,
        allowNull: true,
      },
      auth_grant_type: {
        type: type.STRING,
        allowNull: false,
      },
      state_param_supported: {
        type: type.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        field: 'created_on',
        type: type.DATE,
      },
      updatedAt: {
        field: 'modified_on',
        type: type.DATE,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

module.exports = oauth2ClientDetailsModel;
