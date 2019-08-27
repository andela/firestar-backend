/* eslint-disable no-unused-vars */
// import faker from 'faker';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: 'adewale@gmail.com',
    password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
