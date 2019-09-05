export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    reasons: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'accepted', 'rejected'],
      defaultValue: 'open',
    },
    trip: DataTypes.REAL,
  }, {});
  return Request;
};
