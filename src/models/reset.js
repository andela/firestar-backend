'use strict';

// define the Reset model with its content
const reset = (sequelize, DataTypes) => {
  const Reset = sequelize.define('reset', {
    reset_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    reset_token: {
      type: DataTypes.STRING,
      unique: true
    },
    expire_time: {
      type: DataTypes.DATE
    }
  });

  Reset.associate = (models) => {
    Reset.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };

  return Reset;
};

export default reset;
