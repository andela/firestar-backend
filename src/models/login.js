export default (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    email: DataTypes.STRING
  }, {});
  return Login;
};
