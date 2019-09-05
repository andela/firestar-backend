export default (sequelize, DataTypes) => {
  const LanguageOption = sequelize.define('LanguageOption', {
    name: DataTypes.STRING
  }, {});
  return LanguageOption;
};
