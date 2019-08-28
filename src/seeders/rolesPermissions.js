module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Permissions',
    [
      {
        resourceId: 1,
        roleId: 1,
        delete: true,
        edit: true,
        read: true,
        add: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 2,
        roleId: 1,
        delete: true,
        edit: true,
        read: true,
        add: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 3,
        roleId: 1,
        delete: true,
        edit: true,
        read: true,
        add: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 4,
        roleId: 1,
        delete: true,
        edit: true,
        read: true,
        add: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 1,
        roleId: 2,
        delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 2,
        roleId: 2,
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 1,
        roleId: 3,
        read: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resourceId: 1,
        roleId: 4,
        add: true,
        edit: false,
        read: false,
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null, {})
};
