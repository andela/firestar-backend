module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    to: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    from: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'accommodations',
        key: 'id'
      }
    },
    requestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id'
      }
    },
    tripDate: {
      type: Sequelize.DATE,
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('trips')
};
