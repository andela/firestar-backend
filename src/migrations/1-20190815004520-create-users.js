module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
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
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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