'use strict';
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Destination.associate = function(models) {
    // associations can be defined here
  };
  return Destination;
};