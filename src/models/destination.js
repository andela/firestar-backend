
export default (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  return Destination;
};
