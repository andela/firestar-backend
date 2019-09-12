module.exports = (sequelize, DataTypes) => {
  const destination = sequelize.define('destinations', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  destination.associate = (models) => {
    destination.hasMany(models.trips, {
      foreignKey: 'to'
    });
    destination.hasMany(models.trips, {
      foreignKey: 'from'
    });
  };
  return destination;
};
