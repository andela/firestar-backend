/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Requests', [
    {
      requesterId: 1,
      managerId: 3,
      reasons: 'business',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      requesterId: 2,
      managerId: 3,
      reasons: 'business',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      requesterId: 1,
      managerId: 3,
      reasons: 'audit',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Requests', null, {})
};
