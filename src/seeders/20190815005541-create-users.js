'use strict'
// import faker from 'faker';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail10@andela.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail20@andela.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: process.env.YOUR_EMAIL,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}