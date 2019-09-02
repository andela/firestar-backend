export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    add: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN
  });
  Permission.associate = (models) => {
    Permission.belongsTo(models.resource, {
      foreignKey: 'resourceId'
    });
  };
  return Permission;
};
