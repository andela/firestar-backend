
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Resources', [
    {
      name: 'users',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'roles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'permissions',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Booking',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Resources', null, {})
};
