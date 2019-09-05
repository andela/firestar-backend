
module.exports = (sequelize, DataTypes) => {
  const logins = sequelize.define('logins', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  logins.associate = (models) => {
    // associations can be defined here
  };
  return logins;
};
