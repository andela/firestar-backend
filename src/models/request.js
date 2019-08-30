
export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    departureLocation: DataTypes.STRING,
    destinationIds: DataTypes.ARRAY(DataTypes.STRING),
    accommodationIds: DataTypes.ARRAY(DataTypes.STRING),
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    reasons: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  return Request;
};
