const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('logins', [{
    email: 'youremail10@andela.com',
    password: 'password',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'youremail20@andela.com',
    password: 'password',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'example@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'example1@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'example2@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'example3@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'example4@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'youremail10@andela.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'youremail20@andela.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: process.env.YOUR_EMAIL,
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'barefoot@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'abc123@gmail.com',
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: faker.internet.email(),
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: faker.internet.email(),
    password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('logins', null, {})
};
