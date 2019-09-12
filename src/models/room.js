export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    type: DataTypes.STRING
  }, {});
  return Room;
};
