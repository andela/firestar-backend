
/** Users */
{
    id: Integer; 
    firstname: String;
    lastname: String;
    email: String;
    password: String;
    gender: String;
    role: String;           //portfolio in the company
    verified: Boolean;      //user signup verification, Default value is false
}


/** Requests */
{
    id: Integer;
    requesterId: Integer;    // user id
    managerId: Integer;      //used to notify managers who also a user
    tripType: String;       // One-way or return trip
    departureLocation: String;
    destinationIds: Array;     // an array of destinations
    accommodationIds: Array;      // an array of chosen accomodation linked to a destination
    departureDate: Date;
    returnDate: Date;
    reasons: String;            // reasons for traveling
    status: String;            // valid values: open, accepted, rejected, Default value is open


}

/** Destinations */
{
    id: Integer;
    name: String;       //office locations or destinations, e.g Lagos, Nairobi, New York
    country: String     // e.g. Nigeria
}

/** Accommodations */
{
    id: Integer;
    Locationid: Integer;    // destination id
    nameOfFacility: String  // e.g Eko Hotels and suites
    address: String;
    imageUrl: String;       // cloudinary image url
    numberOfRooms: Integer;
    roomTypes: String;      // e.g. deluxe, 
}