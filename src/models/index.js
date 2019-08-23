'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
console.log('config', config);
console.log('env', env);
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Import the models
const models = {
  User: sequelize.import('./user.js'),
  Login: sequelize.import('./login.js'),
  Reset: sequelize.import('./reset.js')
};

// and combine those models and resolve their associations using the Sequelize API
Object.keys(db).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(db);
  }
});

export { sequelize };

export default models;
