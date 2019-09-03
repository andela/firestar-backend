
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    first_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: Sequelize.STRING,
    },
    preferred_currency: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }

  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
