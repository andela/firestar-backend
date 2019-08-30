/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Destinations', [
    {
      name: 'lagos',
      country: 'Nigeria',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'kampala',
      country: 'Uganda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'kigali',
      country: 'Rwanda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'nairoi',
      country: 'Kenya',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'san francisco',
      country: 'Usa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'new york',
      country: 'Usa',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Destinations', null, {})
};
