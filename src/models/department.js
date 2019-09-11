module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    name: DataTypes.STRING,
    managerId: DataTypes.STRING
  }, {});
  department.associate = (models) => {
    department.belongsTo(models.User, {
      foreignKey: 'managerId',
      as: 'manager'
    });
  };
  return department;
};
