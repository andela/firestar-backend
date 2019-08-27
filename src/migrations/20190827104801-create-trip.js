
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accomodation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    booking_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    trip_type: {
      type: Sequelize.ENUM('one_way', 'return_trip')
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stops: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    travel_reasons: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    trip_status: {
      type: Sequelize.ENUM('open', 'pending', 'rejected', 'approved', 'confirmed', 'cancelled'),
      allowNull: false
    },
    actioned_by: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('Trips')
};
