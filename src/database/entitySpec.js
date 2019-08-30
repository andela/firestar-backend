const databaseStructure = {
/** Users */
  Users: {
    id: Integer,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    gender: String,
    role: String, // portfolio in the company
    isVerified: Boolean, // user signup verification, Default value is false
    phoneNumber: String,
    prefferedCurrency: String,

  },


  /** Requests */
  Requests: {
    id: Integer,
    requesterId: Integer, // user id
    managerId: Integer, // used to notify managers who also a user
    reasons: String, // reasons for traveling
    status: String, // valid values: open, accepted, rejected, Default value is open
    tripId: Integer

  },
  /** Trips */
  Trips: {
    id: Integer,
    tripType: String, // One-way or return trip
    departureLocation: String,
    destinationIds: Array(Integer), // an array of destinations
    accommodationIds: Array(Integer), // an array of chosen accomodation linked to a destination
    departureDate: Date,
    returnDate: Date,

  },

  /** Destinations */
  Destination: {
    id: Integer,
    name: String, // office locations or destinations, e.g Lagos, Nairobi, New York
    country: String, // e.g. Nigeria
    numberOfTimesVisited: Integer // number of times that the location has been visited
  },

  /** Accommodations */
  Accommodations: {
    id: Integer,
    Locationid: Integer, // destination id
    nameOfFacility: String, // e.g Eko Hotels and suites
    address: String,
    imageUrl: String, // cloudinary image url
    numberOfRooms: Integer,
    roomTypes: String, // e.g. deluxe,
    numberOfTimesUsed: Integer //
  },
};
