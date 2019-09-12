/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LanguageOptions', [
    {
      name: 'English',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'French',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Spanish',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('LanguageOptions', null, {})
};
