"use strict";

// define the Users model with its content
const users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "user",
    {
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
    },
    { freezeTableName: true }
  );

  Users.associate = models => {
    Users.hasOne(models.login, {
      foreignKey: "email",
      as: "loginDetails"
    });

    Users.hasOne(models.reset, {
      foreignKey: "email",
      as: "resetDetails"
    });
  };

  return Users;
};

export default users;
