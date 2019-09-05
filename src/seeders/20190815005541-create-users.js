module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        username: 'iammarusoft',
        firstName: 'alimi',
        lastName: 'marusoft',
        email: 'example@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'iammarusoft1',
        firstName: 'alimi1',
        lastName: 'marusoft1',
        email: 'example1@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'iammarusoft2',
        firstName: 'alimi2',
        lastName: 'marusoft2',
        email: 'example2@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'iammarusoft3',
        firstName: 'alimi3',
        lastName: 'marusoft3',
        email: 'example3@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'iammarusoft4',
        firstName: 'alimi4',
        lastName: 'marusoft4',
        email: 'example4@gmail.com',
        password: '$2a$10$f7CWmXI07w5Y3JtsYNe8jeExmw5sbZxTSyAPONHXq/Jbp7/OpzmEy',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
