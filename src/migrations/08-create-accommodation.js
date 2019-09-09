/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accommodation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    numberOfTimesUsed: {
      type: Sequelize.INTEGER
    },
    address: {
      type: Sequelize.STRING
    },
    nameOFFacility: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    numberOfRooms: {
      type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('accommodation')
};
