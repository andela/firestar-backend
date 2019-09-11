/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Departments', [
    {
      name: 'People',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Talent',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Engineering',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Departments', null, {})
};
