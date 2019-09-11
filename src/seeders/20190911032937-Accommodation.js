/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      name: 'Blueird hotel',
      numberOfTimesUsed: 70,
      address: 'principal avenue',
      nameOfFacility: 'tdfdyfy',
      imageUrl: 'https://gchgcc.com/jpg',
      numberOfRooms: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Greenbird hotel',
      numberOfTimesUsed: 50,
      address: 'flat foot crescent',
      nameOfFacility: 'srsrsxcc',
      imageUrl: 'https://gxdDxfngx.com/jpg',
      numberOfRooms: 102,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Oriental hotel',
      numberOfTimesUsed: 37,
      address: 'bushy brows corner',
      nameOfFacility: 'gcftdtyky',
      imageUrl: 'https://gccxfxcgcj.com/jpg',
      numberOfRooms: 76,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})
};
