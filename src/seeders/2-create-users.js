const faker = require('faker');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail10@andela.com',
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail20@andela.com',
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: process.env.YOUR_EMAIL,
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roleId: 1,
      email: 'barefoot@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'abc123@gmail.com',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'barefoot1@gmail.com',
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'barefoot2@gmail.com',
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester1@gmail.com',
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester2@gmail.com',
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester3@gmail.com',
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
