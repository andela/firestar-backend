const faker = require('faker');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    roleId: 1,
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: 'abc123@gmail.com',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
