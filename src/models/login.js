// define the Login model with its content
const logins = (sequelize, DataTypes) => {
  const Login = sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 420]
      }
    },
    lastLogin: {
      type: DataTypes.DATE
    },
  });

  Login.associate = (models) => {
    Login.belongsTo(models.User, {
      foreignKey: 'email',
      onDelete: 'CASCADE'
    });
  };

  return Login;
};

export default logins;
