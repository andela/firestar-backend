module.exports = (sequelize, DataTypes) => {
  const accommodation = sequelize.define('accommodation', {
    name: DataTypes.STRING,
    noOfRooms: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timesVisited: DataTypes.INTEGER
  }, {});
  accommodation.associate = (models) => {
    accommodation.hasMany(models.Trip, {
      foreignKey: 'accommodationId'
    });
  };
  return accommodation;
};
