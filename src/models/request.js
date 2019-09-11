module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    tripType: DataTypes.STRING,
    requesterId: DataTypes.STRING,
    reason: DataTypes.STRING,
    managerId: DataTypes.STRING,
    departmentId: DataTypes.INTEGER
  }, {});
  request.associate = (models) => {
    request.hasMany(models.Trip, {
      foreignKey: {
        name: 'requestId',
      }
    });
    request.belongsTo(models.User, {
      foreignKey: {
        name: 'requesterId',
        allowNull: false
      }
    });
    request.belongsTo(models.User, {
      foreignKey: {
        name: 'managerId',
        allowNull: false
      }
    });
    request.belongsTo(models.Department, {
      foreignKey: {
        name: 'departmentId',
        allowNull: false
      }
    });
  };
  return request;
};
