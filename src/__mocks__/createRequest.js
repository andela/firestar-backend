export const token = {
  requester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjFAZ21haWwuY29tIiwiaWF0IjoxNTY4MzMxNTQyfQ.n5efuOIE5t8aK7JSZrgjZGJ6lrrSfETwPZ_GnrQffBA',
  requester1: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjFAZ21haWwuY29tIiwiaWF0IjoxNTY4MzQyODcyfQ.wiRocCxN9GS4s_X_30WkIth3pWawZbFM5Wafa_Q53b0',
  requester2: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjJAZ21haWwuY29tIiwiaWF0IjoxNTY4MzQyOTM2fQ.jW00RRbqCPqMza2KxMmYM6UdQW1Ieeyp-IWNnbccRDE',
  nonRequester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZUlkIjoyLCJlbWFpbCI6ImFiYzEyM0BnbWFpbC5jb20iLCJpYXQiOjE1NjgzMzIxNzB9.Id4DGJnFef9huOnOw_zYsyYVOLWzLwBmqIU9cQtJjho'
};

export const requests = {
  noReason: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    departmentId: 2,
    tripType: 'oneWay'
  },
  invalidReason: {
    trips:{
      destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
    },
    reason: '23231',
    departmentId: 2,
    tripType: 'oneWay'
  },
  noTrips: {
    trips: {},
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay'
  },
  noTripType: {
    trips:{
      destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
    },
    reason: 'Business',
    departmentId: 2,
    tripType: '',
  },
  invalidTripType: {
    trip: {
      destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
    },
    reason: 'Business',
    departmentId: 2,
    tripType: 'one',
  },
  noDepartment: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: null,
    tripType: 'oneWay'
  },
  invalidDepartment: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 'p',
    tripType: 'oneWay'
  },
  noDestination: {
    trip:
      {
        destinationLocationId: null, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidDestination: {
    trip: 
      {
        destinationLocationId: 'p', departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  nonExistentDestination: {
    trip:
      {
        destinationLocationId: 100, departureLocationId: 1, accommodationId: 100, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  noDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: null, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 'k', accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  nonExistentDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 100, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  noAccommodation: {
    trip:{
        destinationLocationId: 1, departureLocationId: 1, accommodationId: null, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidAccommodation: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 'k', departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  noExistentAccommodation: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 200, departureDate: '2019/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  noDate: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 1, departureDate: ''
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidDate: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 1, departureDate: 'dd32dce'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  oneWay: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidOneWay: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2020/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  return: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
    returnTrip: {
      destinationLocationId: 1, departureLocationId: 2, accommodationId: 1, departureDate: '2020/10/11 18:00'
    },
    reason: 'Business',
    departmentId: 2,
    tripType: 'return',
  },
  invalidReturn: {
    initialTrip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      returnTrip: {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 3, departureDate: '2020/10/11 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'return',
  },
  invalidReturn2: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      returnTrip: {
        destinationLocationId: 3, departureLocationId: 1, accommodationId: 3, departureDate: '2020/10/11 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'return',
  },
  invalidReturn3: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2020/10/10 18:00'
      },
    reason: 'Business',
    departmentId: 2,
    tripType: 'return',
  },
  invalidReturn4: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      },
      {
        destinationLocationId: 4, departureLocationId: 4, accommodationId: 4, departureDate: '2020/10/12 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'return',
  },
  multiCity: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
  invalidOneWay2: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'oneWay',
  },
  invalidRequest: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2018/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/10 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
  invalidRequest2: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/10 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
  invalidRequest3: {
    trips: {},
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
  invalidRequest4: {
    trips: [2, 4],
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
  invalidMultiCity: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2020/10/10 18:00'
      }
    ],
    reason: 'Business',
    departmentId: 2,
    tripType: 'multiCity',
  },
};

export const users = [
  {
    firstName: 'Mike',
    lastName: 'Dean',
    email: 'barefoot1@gmail.com',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'James',
    lastName: 'Ross',
    email: 'barefoot2@gmail.com',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jamie',
    lastName: 'Stones',
    email: 'requester1@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Ross',
    lastName: 'Mike',
    email: 'requester2@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Harvey',
    lastName: 'Specter',
    email: 'requester3@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'abc123@gmail.com',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const accommodations = [
  {
    name: 'Spring Hotels',
    noOfRooms: 2,
    type: 'standard',
    timesVisited: 1,
    destinationId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Grace Hotels',
    noOfRooms: 1,
    type: 'standard',
    destinationId: 2,
    timesVisited: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Michai Hotels',
    noOfRooms: 4,
    type: 'suite',
    timesVisited: 1,
    destinationId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export const destinations = [
  {
    name: 'Epic Tower',
    country: 'Nigeria',
    city: 'Lagos',
    destinationId: 1,
    address: '77 Ikorodu road, Lagos, Nigeria',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Might Tower',
    country: 'Uganda',
    city: 'unknown',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Peak Tower',
    country: 'Kenya',
    city: 'Kampala',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mount Will',
    country: 'Tanzania',
    city: 'unknown',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const departments = [{
  name: 'IT',
  managerId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'ACCOUNTS',
  managerId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'ADMINISTARTION',
  managerId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'HUMAN RESOURCES',
  managerId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}];
