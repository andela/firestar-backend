/* eslint-disable no-unused-vars */
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: 'Tess',
    last_name: 'Gottlieb',
    email: 'example@gmail.com',
    password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
