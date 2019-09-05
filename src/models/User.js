export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    isProfileSaved: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    prefferedCurrencyId: DataTypes.INTEGER,
    prefferedLanguageId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {});
  return User;
};
