'use strict';

// define the Login model with its content
const login = (sequelize, DataTypes) => {
  const Login = sequelize.define('login', {
    login_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
        len: [4, 420]
      }
    },
    last_login: {
      type: DataTypes.DATE
    },
  });

  Login.associate = models => {
    Login.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };

  return Login;
};

export default login;
