export default (sequelize, DataTypes) => {
  const OfficeBranch = sequelize.define('OfficeBranch', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    numberOfTimesVisited: DataTypes.INTEGER
  }, {});
  return OfficeBranch;
};
