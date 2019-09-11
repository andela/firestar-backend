module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('departments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    managerId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'email',
        as: 'manager'
      }
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
  down: (queryInterface) => queryInterface.dropTable('departments')
};
