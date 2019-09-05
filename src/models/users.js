module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferredCurrency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    residetialLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    savedProfile: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  // users.associate = (models) => {
  //   users.hasMany(models.logins, {
  //     foreignKey: 'userEmail',
  //     sourceKey: 'email',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return users;
};
