'use strict';
module.exports = (sequelize, DataTypes) => {
  const logins = sequelize.define('logins', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE
  }, {});
  logins.associate = function(models) {
    // associations can be defined here
  };
  return logins;
};
