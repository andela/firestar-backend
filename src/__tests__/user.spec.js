import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import 'chai/register-should';

// import models from '../models';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

const BASE_URL = '/api';

let request;

describe('User Route', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  describe('PATCH /editprofile/:id', () => {
    it('should update users profile', async () => {
      const updatedUser = {
        id: 1,
        firstName: 'Logan',
        lastName: 'Adewale',
        email: 'Piper32@hotmail.com',
        company: 'Armstrong, Raynor and Hyatt',
        gender: 'female',
        role: 'Internal Markets Officer',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Yen',
        residentialLocation: '30419 Tara Pike',
        countryCode: 'LY',
        birthdate: '2018-12-01 20::41.411 +00:00',
        department: 'Books'
      };

      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/editprofile/${updatedUser.id}`)
        .set('Content-Type', 'application/json')
        .send(updatedUser);
      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.firstName).to.equal(updatedUser.firstName);
    });
  });
});
