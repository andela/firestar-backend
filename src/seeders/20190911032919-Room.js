/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Rooms', [
    {
      type: 'Deluxe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'Studio',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'Presidential suite',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Rooms', null, {})
};
