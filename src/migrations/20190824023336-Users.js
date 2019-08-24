/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'Users',
      'password',
      {
        type: Sequelize.STRING
      }
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'email'),
    queryInterface.removeColumn('Users', 'password')
  ])
};
