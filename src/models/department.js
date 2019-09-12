export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {});
  return Department;
};
