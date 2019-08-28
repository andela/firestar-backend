module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      prefferedLanguage: {
        type: Sequelize.STRING
      },
      prefferedCurrency: {
        type: Sequelize.STRING
      },
      residentialLocation: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      lineManager: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};