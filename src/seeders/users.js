const faker = require('faker');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    roleId: 1,
    password: 'password',
    email: 'barefoot@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: 'abc123@gmail.com',
    password: 'password',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: 'password',
    email: faker.internet.email(),
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
