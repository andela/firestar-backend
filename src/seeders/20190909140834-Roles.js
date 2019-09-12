/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      name: 'Super Administrator',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel Administrator',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Requester',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel team member',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
