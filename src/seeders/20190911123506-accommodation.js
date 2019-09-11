module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('accommodations', [
    {
      name: 'Spring Hotels',
      noOfRooms: 2,
      type: 'standard',
      timesVisited: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grace Hotels',
      noOfRooms: 1,
      type: 'standard',
      timesVisited: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Michai Hotels',
      noOfRooms: 4,
      type: 'suite',
      timesVisited: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('accommodations', null, {})
};
