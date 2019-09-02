'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};