/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    requesterId: {
      type: Sequelize.INTEGER
    },
    managerId: {
      type: Sequelize.INTEGER
    },
    reasons: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['open', 'accepted', 'rejected'],
      defaultValue: 'open',
    },
    trip: {
      type: Sequelize.REAL
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Requests')
};
