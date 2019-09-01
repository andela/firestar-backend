// define the Reset model with its content
const reset = (sequelize, DataTypes) => {
  const Reset = sequelize.define('reset', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    resetToken: {
      type: DataTypes.STRING,
      unique: true
    },
    expireTime: {
      type: DataTypes.DATE
    }
  });

  Reset.associate = (models) => {
    Reset.belongsTo(models.User, {
      foreignKey: 'email',
      onDelete: 'CASCADE'
    });
  };

  return Reset;
};

export default reset;
