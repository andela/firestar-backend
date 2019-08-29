'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    locationId: DataTypes.INTEGER,
    nameOfFacility: DataTypes.STRING,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    roomTypes: DataTypes.STRING
  }, {});
  Accommodation.associate = function(models) {
    // associations can be defined here
  };
  return Accommodation;
};