import bcrypt from 'bcrypt';

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
    preferredCurrencyId: DataTypes.INTEGER,
    preferredLanguageId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {});
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.beforeUpdate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.verifyPassword = async function verifyPassword(inputPassword) {
    const isPasswordCorrect = await bcrypt
      .compare(inputPassword, this.password);
    return isPasswordCorrect;
  };
  User.associate = (models) => {
    User.hasOne(models.Login, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });

    User.hasOne(models.Reset, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
