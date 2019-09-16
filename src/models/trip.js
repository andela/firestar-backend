module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trips', {
    destinationLocationId: DataTypes.INTEGER,
    departureLocationId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    departureDate: DataTypes.DATE
  }, {});
  trip.associate = (models) => {
    trip.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId'
    });
    trip.belongsTo(models.requests, {
      foreignKey: 'requestId'
    });
  };
  return trip;
};
