module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('resources', [
    {
      name: '/users/edit/role',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '/roles/:roleId/permissions',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('resources', null, {})
};
