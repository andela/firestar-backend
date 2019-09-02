module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        firstName: 'alimi',
        lastName: 'marusoft',
        email: 'example@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'alimi1',
        lastName: 'marusoft1',
        email: 'example1@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'alimi2',
        lastName: 'marusoft2',
        email: 'example2@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'alimi3',
        lastName: 'marusoft3',
        email: 'example3@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'alimi4',
        lastName: 'marusoft4',
        email: 'example4@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
