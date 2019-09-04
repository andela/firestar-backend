const faker = require('faker');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    roleId: 1,
    password: 'password',
    email: 'barefoot@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'abc123@gmail.com',
    password: 'password',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'password',
    email: faker.internet.email(),
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
