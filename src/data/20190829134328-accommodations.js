/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      locationId: 1,
      nameOfFacility: 'lllllll',
      address: 'kkkkkkk',
      imageUrl: 'https://jdjdjkd',
      numberOfRooms: 30,
      roomTypes: ['deluxe', 'standard', 'studio'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      locationId: 1,
      nameOfFacility: 'ttttttt',
      address: 'yyyyyy',
      imageUrl: 'https://jkkkkkkkk',
      numberOfRooms: 20,
      roomTypes: ['deluxe', 'standard', 'studio', 'presidential'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      locationId: 2,
      nameOfFacility: 'aaaaaaa',
      address: 'bbbbbb',
      imageUrl: 'https://yyyyyyyyy',
      numberOfRooms: 30,
      roomTypes: ['deluxe', 'standard', 'twin'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})
};
