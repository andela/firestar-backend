'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('resets', [{
      email: 'youremail@andela.com',
      resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'youremail2@andela.com',
      resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('resets', null, {});
  }
}