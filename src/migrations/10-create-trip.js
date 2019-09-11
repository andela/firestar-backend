export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tripType: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['one-way', 'return-trip']]
      }
    },
    requestId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Requests',
        key: 'id',
      }
    },
    departureLocationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'OfficeBranch',
        key: 'id',
      }
    },
    destinationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'OfficeBranch',
        key: 'id',
      }
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      }
    },
    departureDate: {
      type: Sequelize.DATE
    },
    returnDate: {
      type: Sequelize.DATE
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
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Trips')
};
