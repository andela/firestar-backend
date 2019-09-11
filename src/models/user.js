const users = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    preferredLanguage: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    preferredCurrency: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    residentialLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
    saveProfile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

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

export default users;
