"use strict";

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {});

  Users.associate = function (models) {// associations can be defined here
  };

  return Users;
};