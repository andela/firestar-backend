/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      firstname: 'ogo',
      lastname: 'ogo',
      email: 'ogo@andela.com',
      password: '%^6((yuuo5265',
      gender: 'male',
      role: 'TTL',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstname: 'didun',
      lastname: 'didun',
      email: 'didun@andela.com',
      password: '%^8yty293 gcjkjdc265',
      gender: 'male',
      role: 'PO',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstname: 'frank',
      lastname: 'frank',
      email: 'frank@andela.com',
      password: '%^he8389ynr&^*^&65',
      gender: 'male',
      role: 'LFA',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};
