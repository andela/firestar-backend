module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    company: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    department: DataTypes.STRING,
    residentialLocation: DataTypes.STRING,
    lineManager: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
