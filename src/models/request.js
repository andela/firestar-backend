module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('requests', {
    tripType: DataTypes.STRING,
    requesterId: DataTypes.STRING,
    reason: DataTypes.STRING,
    managerId: DataTypes.STRING,
    departmentId: DataTypes.INTEGER
  }, {});
  request.associate = (models) => {
    request.hasMany(models.trips, {
      foreignKey: {
        name: 'requestId',
      }
    });
    request.belongsTo(models.users, {
      foreignKey: {
        name: 'requesterId',
        allowNull: false
      }
    });
    request.belongsTo(models.users, {
      foreignKey: {
        name: 'managerId',
        allowNull: false
      }
    });
    request.belongsTo(models.departments, {
      foreignKey: {
        name: 'departmentId',
        allowNull: false
      }
    });
  };
  return request;
};
