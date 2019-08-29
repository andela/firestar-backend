'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    departureLocation: DataTypes.STRING,
    destinationIds: DataTypes.ARRAY(DataTypes.INTEGER),
    accommodationIds: DataTypes.ARRAY(DataTypes.INTEGER),
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    reasons: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
  };
  return Request;
};