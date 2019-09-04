'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    locationId: DataTypes.INTEGER,
    nameOfFacility: DataTypes.STRING,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    roomTypes: DataTypes.STRING,
    numberOfTimesUsed: DataTypes.INTEGER
  }, {});
  accommodations.associate = (models) => {
    // associations can be defined here
  };
  return accommodations;
};