/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Currency', [
    {
      name: 'Dollars',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pounds',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Naira',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Currency', null, {})
};
