module.exports = (sequelize, DataTypes) => {
  const accommodation = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    noOfRooms: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timesVisited: DataTypes.INTEGER
  }, {});
  accommodation.associate = (models) => {
    accommodation.hasMany(models.trips, {
      foreignKey: 'accommodationId'
    });
  };
  return accommodation;
};
