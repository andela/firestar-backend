'use strict';

// define the Reset model with its content
const reset = (sequelize, DataTypes) => {
  const Reset = sequelize.define('reset', {
    user_id: {
      type: DataTypes.INTEGER
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

  Reset.associate = models => {
    Reset.belongsTo(models.User, {
      foreignKey: 'email',
      onDelete: 'CASCADE'
    });
  };

  return Reset;
};

export default reset;
