'use strict';
module.exports = (sequelize, DataTypes) => {
  const destinations = sequelize.define('destinations', {
    name: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    numberOfTimesVisited: DataTypes.INTEGER
  }, {});
  destinations.associate = (models) => {
    // associations can be defined here
  };
  return destinations;
};