"use strict";

// define the Users model with its content
const users = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isEmail: true
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
      foreignKey: "email"
    });

    User.hasOne(models.Reset, {
      foreignKey: "email"
    });
  };

  return User;
};

export default users;
