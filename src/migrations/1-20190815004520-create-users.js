module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
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
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 5,
      onDelete: 'CASCADE',
      references: {
        model: 'roles',
        key: 'id',
      }
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    },
    dateOfBirth: {
      type: Sequelize.DATE
    },
    preferredLanguage: {
      type: Sequelize.STRING
    },
    preferredCurrency: {
      type: Sequelize.STRING
    },
    residentialLocation: {
      type: Sequelize.STRING
    },
    departmentId: {
      type: Sequelize.INTEGER
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
  down: (queryInterface) => queryInterface.dropTable('users')
};
