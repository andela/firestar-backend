'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    countryCode: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  country.associate = function(models) {
    // associations can be defined here
  };
  return country;
};