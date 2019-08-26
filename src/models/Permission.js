export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    add: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN
  });
  Permission.associate = (models) => {
    Permission.belongsTo(models.Resource, {
      foreignKey: 'resourceId'
    });
  };
  return Permission;
};
