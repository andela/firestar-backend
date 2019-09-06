module.exports = (sequelize, DataTypes) => {
  const logins = sequelize.define('logins', {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    lastLogin: {
      type: DataTypes.DATE,
    }
  }, {});
  logins.associate = (models) => {
    logins.belongsTo(models.users, {
      foreignKey: 'email', onDelete: 'CASCADE'
    });
  };
  return logins;
};
