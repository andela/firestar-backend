const faker = require('faker');
const gender = ['male', 'female'];
const language = ['English', 'French'];

export const updateUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.name.firstName(),
  email: faker.internet.email(),
  gender: faker.random.arrayElement(gender),
  roleId: 5,
  prefferedLanguage: faker.random.arrayElement(language),
  prefferedCurrency: faker.finance.currencyName(),
  residentialLocation: faker.address.streetAddress(),
  countryCode: faker.address.countryCode(),
  dateOfBirth: new Date(),
  department: faker.commerce.department(),
  lineManager: faker.name.jo,
  saveProfile: null,
  isVerified: false
}

export const updateUser2 = {
  firstName: 'A',
  lastName: faker.name.lastName(),
  userName: faker.name.firstName(),
  email: faker.internet.email(),
  gender: faker.random.arrayElement(gender),
  roleId: 5,
  prefferedLanguage: faker.random.arrayElement(language),
  prefferedCurrency: faker.finance.currencyName(),
  residentialLocation: faker.address.streetAddress(),
  countryCode: faker.address.countryCode(),
  dateOfBirth: new Date(),
  department: faker.commerce.department(),
  lineManager: faker.name.jobType(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  isVerified: false,
  saveProfile: null
}

export const userId = 8;
export const wrongId = 212;

export const invalidUserData = {
  firstName: 'A'
}

export const inValidRequest = {
  attendance: 'okay'
}
export const invalidSyntax = 'dsa'
export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJpYXQiOjE1Njc3MTk3NTAsImV4cCI6MTU2NzgwNjE1MH0.0kp8DabUPI0JoKkCArXG-Ly-EG-6WcSxLO_fdIrVm18'
export const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1Njc0Mjg0NDUsImV4cCI6MTU2NzUxNDg0NX0.DyMcVLwMWhOt7yZWev8adIN9NE9vvnDehHMDmrjNYoU'
export const inValidToken2 = 'GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1Njc0Mjg0NDUsImV4cCI6MTU2NzUxNDg0NX0.DyMcVLwMWhOt7yZWev8adIN9NE9vvnDehHMDmrjNYoU'
