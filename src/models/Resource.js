export default (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Resource.associate = (models) => {
    Resource.hasMany(models.Permission, {
      foreignKey: 'resourceId'
    });
  };
  return Resource;
};
