export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.role, {
      foreignKey: 'roleId'
    });
  };
  return User;
};
