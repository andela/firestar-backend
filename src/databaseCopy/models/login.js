"use strict";

// define the Login model with its content
const login = (sequelize, DataTypes) => {
  const Login = sequelize.define("login", {
    user_id: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 42]
      }
    },
    last_login: {
      type: DataTypes.DATE
    },
    login: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Login.associate = models => {
    Login.belongsTo(models.User, {
      foreignKey: "email",
      onDelete: "CASCADE"
    });
  };

  return Login;
};

export default login;
