"use strict";

// define the Users model with its content
const users = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42]
      }
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      unique: true
    },
    role: {
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    User.hasOne(models.Login, {
      foreignKey: "email",
      as: "loginDetails"
    });

    User.hasOne(models.Reset, {
      foreignKey: "email"
    });
  };

  return User;
};

export default users;
