/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'ogo',
      lastName: 'ogo',
      email: 'ogo@andela.com',
      password: '%^6((yuuo5265',
      gender: 'male',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'didun',
      lastName: 'didun',
      email: 'didun@andela.com',
      password: '%^8yty293 gcjkjdc265',
      gender: 'male',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'frank',
      lastName: 'frank',
      email: 'frank@andela.com',
      password: '%^he8389ynr&^*^&65',
      gender: 'male',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};
