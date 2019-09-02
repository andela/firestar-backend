export default (sequelize, DataTypes) => {
  const Resource = sequelize.define('resource', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Resource.associate = (models) => {
    Resource.hasMany(models.permission, {
      foreignKey: 'resourceId'
    });
  };
  return Resource;
};
