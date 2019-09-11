module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    to: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    departureDate: DataTypes.TIMESTAMP
  }, {});
  trip.associate = (models) => {
    trip.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId'
    });
    trip.belongsTo(models.Request, {
      foreignKey: 'requestId'
    });
  };
  return trip;
};
