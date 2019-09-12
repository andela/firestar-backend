/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'abcd',
      lastName: 'efgh',
      email: 'abc@yy.com',
      password: 'hello1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'ijkl',
      lastName: 'mnop',
      email: 'ijk@yy.com',
      password: 'hallo2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'qrst',
      lastName: 'uvwx',
      email: 'qrs@zz.com',
      password: 'hullo3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
