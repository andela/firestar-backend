export default (sequelize, DataTypes) => {
  const CountryCode = sequelize.define('CountryCode', {
    code: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  return CountryCode;
};
