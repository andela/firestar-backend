/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('OfficeBranch', [
    {
      name: 'Lagos',
      numberOfTimesVisited: 700,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kampala',
      numberOfTimesVisited: 580,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'New York',
      numberOfTimesVisited: 899,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('OfficeBranch', null, {})
};
