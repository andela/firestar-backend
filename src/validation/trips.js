import Joi from '@hapi/joi';

export default {
  tripSchema: Joi.object().keys({
    destinationId: Joi.array()
      .required()
      .error(new Error('No destination selected')),
    departureLocation: Joi.string().trim()
      .required()
      .error(new Error('Please provide a valid departure point')),
    reason: Joi.string()
      .required()
      .error(new Error('Invalid Reason for Trip request')),
    type: Joi.string()
      .required()
      .valid(['single', 'multiCity', 'return'])
      .error(new Error('Invalid Trip type')),
    returnDate: Joi.string()
      .optional()
      .error(new Error('Invalid Return Date')),
    travelDate: Joi.string()
      .required()
      .error(new Error('Invalid Travel Date')),
    department: Joi.string().trim()
      .required()
      .error(new Error('Please provide a valid department')),
    accomodationId: Joi.array()
      .required()
      .error(new Error('No accommodation selected'))
  }),

  validateNewTripData: (body) => {
    const {
      destinationId, returnDate, type, accomodationId
    } = body;
    if (type !== 'multiCity' && destinationId.length > 1) {
      throw new Error(`${type} trip cannnot have more than one destination`);
    } else if (type !== 'return' && returnDate) {
      throw new Error(
        `${type} trip cannnot have a return date. Select return trip instead`
      );
    } else if (type === 'return' && !returnDate) {
      throw new Error('Choose date for your return trip');
    } else if (type === 'multiCity' && destinationId.length <= 1) {
      throw new Error('Multi-city trip should have more than one destination');
    } else if (
      type === 'multiCity'
      && accomodationId.length !== destinationId.length
    ) {
      throw new Error(
        'Multi-city trip should have one accomodation per destination'
      );
    } else if (type !== 'multiCity' && accomodationId.length > 1) {
      throw new Error(`${type} trip cannot have more than one accomodation`);
    }
  },

  validateDate: (date, info) => {
    const dateRegex = /^\d+$/;
    const dateFormatRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    if (!dateRegex.test(Date.parse(date))) {
      throw new Error(`Invalid ${info}`);
    } else if (dateFormatRegex.test(date)) {
      throw new Error(`Invalid ${info} Format`);
    } else if (Date.parse(date) <= Date.now()) {
      throw new Error('Choose a date ahead of now');
    }
  },

  validateArrayOfIds: (idArray, customError) => {
    try {
      idArray.every((id) => {
        if (typeof id !== 'number' || id < 1) {
          throw new Error(customError);
        }
        return true;
      });
    } catch (error) {
      throw new Error(customError);
    }
  },

  preventMultiplicationOfId: (idArray, error) => {
    idArray.forEach((id, index, arr) => {
      if (arr[index + 1] && id === arr[index + 1]) {
        throw new Error(error);
      }
    });
  }
};
