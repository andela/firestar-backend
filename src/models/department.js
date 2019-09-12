module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('departments', {
    name: DataTypes.STRING,
    managerId: DataTypes.STRING
  }, {});
  department.associate = (models) => {
    department.belongsTo(models.users, {
      foreignKey: 'managerId',
      as: 'manager'
    });
  };
  return department;
};
