
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    roleId: {
      type: Sequelize.INTEGER
    },
    dateOfBirth: {
      type: Sequelize.DATE
    },
    preferredLanguage: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING,
    },
    preferredCurrency: {
      type: Sequelize.STRING,
    },
    residetialLocation: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    saveProfile: {
      type: Sequelize.BOOLEAN
    },
    countryCode: {
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
