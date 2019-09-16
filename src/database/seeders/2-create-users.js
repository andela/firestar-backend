const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      username: 'iammarusoft',
      firstName: 'alimi',
      lastName: 'marusoft',
      email: 'example@gmail.com',
      isVerified: true,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft1',
      firstName: 'alimi1',
      lastName: 'marusoft1',
      email: 'example1@gmail.com',
      roleId: 5,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft2',
      firstName: 'alimi2',
      lastName: 'marusoft2',
      email: 'example2@gmail.com',
      roleId: 5,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft3',
      firstName: 'alimi3',
      lastName: 'marusoft3',
      email: 'example3@gmail.com',
      roleId: 5,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft4',
      firstName: 'alimi4',
      lastName: 'marusoft4',
      email: 'example4@gmail.com',
      roleId: 5,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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
      email: faker.internet.email(),
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
