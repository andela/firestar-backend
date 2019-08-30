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
    tripType: {
      type: Sequelize.STRING
    },
    departureLocation: {
      type: Sequelize.STRING
    },
    destinationIds: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    accommodationIds: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    departureDate: {
      type: Sequelize.DATE
    },
    returnDate: {
      type: Sequelize.DATE
    },
    reasons: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
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
