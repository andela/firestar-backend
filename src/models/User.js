const users = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleId: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.logins, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });

    User.hasOne(models.resets, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });
  };

  return User;
};

export default users;
