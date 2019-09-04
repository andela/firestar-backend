module.exports = (sequelize, DataTypes) => {
  const logins = sequelize.define('logins', {
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    facebook: {
      type: DataTypes.STRING,
    },
    google: {
      type: DataTypes.STRING,
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {});
  logins.associate = (models) => {
    // associations can be defined here
  };
  return logins;
};
