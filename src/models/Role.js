export default (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  Role.associate = (models) => {
    Role.hasMany(models.permission, {
      foreignKey: 'roleId',
    });
    Role.hasMany(models.user, {
      foreignKey: 'roleId',
    });
  };
  return Role;
};
