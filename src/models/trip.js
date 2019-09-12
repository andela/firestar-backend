module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trips', {
    to: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    tripDate: DataTypes.DATE
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
