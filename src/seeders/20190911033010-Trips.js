/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Trips', [
    {
      tripType: 'return-trip',
      requestId: 1,
      departureLocationId: 1,
      destinationId: 2,
      accommodationId: 1,
      departureDate: new Date(),
      returnDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Trips', null, {})
};
