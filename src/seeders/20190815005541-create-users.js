const faker = require('faker');

const gender = ['male', 'female'];
const language = ['English', 'French'];
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          company: faker.company.companyName(),
          email: faker.internet.email(),
          gender: faker.random.arrayElement(gender),
          role: faker.name.jobTitle(),
          preferredLanguage: faker.random.arrayElement(language),
          preferredCurrency: faker.finance.currencyName(),
          residentialLocation: faker.address.streetAddress(),
          countryCode: faker.address.countryCode(),
          birthdate: faker.date.past(),
          department: faker.commerce.department(),
          lineManager: faker.name.jobType(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Adewale',
          lastName: 'Olaoye',
          company: faker.company.companyName(),
          email: 'wale@gmail.com',
          gender: faker.random.arrayElement(gender),
          role: faker.name.jobTitle(),
          preferredLanguage: faker.random.arrayElement(language),
          preferredCurrency: faker.finance.currencyName(),
          residentialLocation: faker.address.streetAddress(),
          countryCode: faker.address.countryCode(),
          birthdate: faker.date.past(),
          department: faker.commerce.department(),
          lineManager: faker.name.jobType(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
