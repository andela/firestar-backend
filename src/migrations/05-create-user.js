/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
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
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['male', 'female', 'other']]
      }
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY
    },
    isProfileSaved: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    preferredCurrencyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'currencies',
        key: 'id',
      }
    },
    preferredLanguageId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'languageOptions',
        key: 'id',
      }
    },
    departmentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'departments',
        key: 'id',
      }
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
