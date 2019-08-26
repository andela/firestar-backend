export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
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
    Role.hasMany(models.Permission, {
      foreignKey: 'roleId',
    });
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
    });
  };
  return Role;
};
