'use strict'
// import faker from 'faker';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
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