const faker = require('faker');
const gender = ['male', 'female'];
const language = ['English', 'French'];

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
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.name.firstName(),
      email: 'alliolawale@gmail.com',
      gender: faker.random.arrayElement(gender),
      roleId: 5,
      preferredLanguage: faker.random.arrayElement(language),
      preferredCurrency: faker.finance.currencyName(),
      residentialLocation: faker.address.streetAddress(),
      countryCode: faker.address.countryCode(),
      dateOfBirth: faker.date.past(),
      department: faker.commerce.department(),
      lineManager: faker.name.jobType(),
      phoneNumber: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.name.firstName(),
      email: 'dolapoakpan@gmail.com',
      gender: faker.random.arrayElement(gender),
      roleId: 3,
      preferredLanguage: faker.random.arrayElement(language),
      preferredCurrency: faker.finance.currencyName(),
      residentialLocation: faker.address.streetAddress(),
      countryCode: faker.address.countryCode(),
      dateOfBirth: faker.date.past(),
      department: faker.commerce.department(),
      lineManager: faker.name.jobType(),
      phoneNumber: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
