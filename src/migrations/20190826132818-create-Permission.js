module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('permissions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    roleId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'roles',
        key: 'id',
        as: 'role',
      }
    },
    resourceId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'resources',
        key: 'id',
        as: 'resource',
      }
    },
    add: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    edit: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('permissions')
};
