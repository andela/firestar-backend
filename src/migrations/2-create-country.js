'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('countries', {
    countryCode: {
      allowNull: false,
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('countries');
  }
};
