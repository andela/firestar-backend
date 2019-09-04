'use strict';
module.exports = (sequelize, DataTypes) => {
  const requests = sequelize.define('requests', {
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reasons: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'accepted', 'rejected'],
      allowNull: false,
      defaultValue: 'open'
    },
  }, {});
  requests.associate = (models) => {
    // associations can be defined here
    requests.belongsTo(models.users, { foreignKey: 'requesterId', onDelete: 'CASCADE', });
    requests.belongsTo(models.users, { foreignKey: 'managerId', onDelete: 'CASCADE', });
  };
  return requests;
};
