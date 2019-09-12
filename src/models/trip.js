export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    tripType: DataTypes.STRING,
    departureLocationId: DataTypes.STRING,
    destinationId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    departureDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
  }, {});
  return Trip;
};
