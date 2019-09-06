'use strict';

import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// Import the models
const models = {
  User: sequelize.import('./user.js'),
  Login: sequelize.import('./login.js'),
  Reset: sequelize.import('./reset.js')
};

// and combine those models and resolve their associations using the Sequelize API
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
