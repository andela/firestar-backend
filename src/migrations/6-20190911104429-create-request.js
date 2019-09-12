module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tripType: {
      type: Sequelize.ENUM,
      values: ['oneWay', 'return', 'multiCity'],
      allowNull: false,
    },
    requesterId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'email'
      }
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false
    },
    departmentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    managerId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'email'
      }
    },
    status: {
      type: Sequelize.ENUM,
      values: ['open', 'approved', 'rejected'],
      defaultValue: 'open',
      allowNull: false
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
  down: (queryInterface) => queryInterface.dropTable('requests')
};
