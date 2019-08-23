'use strict';
const users = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
      foreignKey: 'id'
    });

    User.hasOne(models.Reset, {
      foreignKey: 'id'
    });
  };

  return User;
};

export default users;
