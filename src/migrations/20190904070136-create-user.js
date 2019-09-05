/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY
    },
    isProfileSaved: {
      type: Sequelize.BOOLEAN
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
