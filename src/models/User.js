'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
    },
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};