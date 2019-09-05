
export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: DataTypes.STRING,
    numberOfTimesUsed: DataTypes.INTEGER,
    address: DataTypes.STRING,
    nameOFFacility: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    officeBranchId: DataTypes.INTEGER,
    roomTypes: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  return Accommodation;
};
