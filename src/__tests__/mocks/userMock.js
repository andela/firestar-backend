// import faker from 'faker';
const faker = require('faker');
const gender = ['male', 'female'];
const language = ['English', 'French'];
export default {
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

export const userId = 1;
export const wrongId = 212;

export const invalidData = {
  firstName: ''
}

export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1Njc0NTczODIsImV4cCI6MTU2NzU0Mzc4Mn0.AyPNgODmUGJbpr-6veG08WFpJIX5iDSqgh6Gy9pyKbU'
export const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1Njc0Mjg0NDUsImV4cCI6MTU2NzUxNDg0NX0.DyMcVLwMWhOt7yZWev8adIN9NE9vvnDehHMDmrjNYoU'
export const inValidToken2 = 'GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1Njc0Mjg0NDUsImV4cCI6MTU2NzUxNDg0NX0.DyMcVLwMWhOt7yZWev8adIN9NE9vvnDehHMDmrjNYoU'

