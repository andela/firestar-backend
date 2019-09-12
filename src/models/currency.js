export default (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    name: DataTypes.STRING
  }, {});
  return Currency;
};
