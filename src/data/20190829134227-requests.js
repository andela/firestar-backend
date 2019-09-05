/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Requests', [
    {
      requesterId: 1,
      managerId: 2,
      tripType: 'return-trip',
      departureLocation: 'lagos',
      destinationIds: [2, 3],
      accommodationIds: [3, 1],
      departureDate: new Date(2019, 9, 2),
      returnDate: new Date(2019, 9, 6),
      reasons: 'business',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      requesterId: 2,
      managerId: 3,
      tripType: 'one-way',
      departureLocation: 'lagos',
      destinationIds: [3, 1],
      accommodationIds: [3, 1],
      departureDate: new Date(2019, 8, 30),
      returnDate: new Date(2019, 9, 7),
      reasons: 'business',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Requests', null, {})
};
