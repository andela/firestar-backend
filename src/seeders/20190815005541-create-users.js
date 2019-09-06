'use strict'
// import faker from 'faker';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'akp.abi@yahoo.com',
      password: 'emma2000',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
}