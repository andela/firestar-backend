'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    preferredLanguage: {
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
    },
    residentialLocation: {
      type: DataTypes.STRING,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
    saveProfile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    countryCode: {
      type: DataTypes.STRING,
    },
  }, {});
  users.associate = (models) => {
    // associations can be defined here
    users.hasMany(models.requests);
  };
  return users;
};
