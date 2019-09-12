module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    to: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    tripDate: DataTypes.DATE
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
