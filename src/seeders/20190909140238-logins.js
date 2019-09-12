/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('logins', [
    {
      email: 'a@a.com',
      password: '123abc',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'b@b.com',
      password: '456def',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'c@c.com',
      password: '789ghi',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('logins', null, {})
};
