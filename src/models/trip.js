'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    accomodation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trip_type: { 
      type: DataTypes.ENUM('one_way', 'return_trip'),
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stops: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    travel_reasons: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trip_status: {
      type: DataTypes.ENUM('open', 'pending', 'rejected', 'approved', 'confirmed', 'cancelled'),
      allowNull: false
    },
    actioned_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Trip;
};
