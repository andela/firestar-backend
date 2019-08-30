export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    locationId: DataTypes.INTEGER,
    nameOfFacility: DataTypes.STRING,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    roomTypes: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  return Accommodation;
};
