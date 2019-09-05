export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    tripType: DataTypes.STRING,
    departureLocationId: DataTypes.STRING,
    destinationId: DataTypes.ARRAY(DataTypes.INTEGER),
    accommodationId: DataTypes.ARRAY(DataTypes.INTEGER),
    departureDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
  }, {});
  return Trip;
};
