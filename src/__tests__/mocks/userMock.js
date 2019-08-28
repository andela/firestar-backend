// import faker from 'faker';
const faker = require('faker');
const gender = ['male', 'female'];
const language = ['English', 'French'];
export default {
  userId: 1,
  wrongId: 2,
  updateUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(gender),
    role: faker.name.jobTitle(),
    prefferedLanguage: faker.random.arrayElement(language),
    prefferedCurrency: faker.finance.currencyName(),
    residentialLocation: faker.address.streetAddress(),
    countryCode: faker.address.countryCode(),
    birthdate: faker.date.past(),
    department: faker.commerce.department(),
    lineManager: faker.name.jobType()
  }
};
