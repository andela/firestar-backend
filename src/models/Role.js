export default (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
