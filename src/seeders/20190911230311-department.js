module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('departments', [{
    name: 'IT',
    managerId: 'barefoot1@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ACCOUNTS',
    managerId: 'barefoot2@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ADMINISTARTION',
    managerId: 'youremail10@andela.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'HUMAN RESOURCES',
    managerId: 'youremail20@andela.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('departments', null, {})
};
