module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('logins',
    [
      {
        email: 'example1@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example@2gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example3@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example4@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example5@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('logins', null, {})
};
