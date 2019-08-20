'use strict'
// import faker from 'faker';
const faker = require('faker');

console.log(faker.name.firstName())
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}