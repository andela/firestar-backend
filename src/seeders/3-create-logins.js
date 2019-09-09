const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('logins', [{
    email: 'youremail10@andela.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'youremail20@andela.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('logins', null, {})
};
