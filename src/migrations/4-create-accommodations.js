'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accommodations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    locationId: { // destination id
      type: Sequelize.INTEGER
    },
    nameOfFacility: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    numberOfRooms: {
      type: Sequelize.INTEGER
    },
    roomTypes: {
      type: Sequelize.ENUM('deluxe', 'standard')
    },
    numberOfTimesUsed: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accommodations');
  }
};