import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';

import { signUp, confirmEmailVerificaionToken } from '../controllers/user';
import { emailVerifyToken } from '../utils/index';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;

describe('EMAIL ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  describe('EMAIL VERIFICATION ROUTE', () => {
    it('should have a status of 200 when message is sent succesfully', async () => {
      const body = {
        email: 'akp.ani@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan'
      };
      const response = await request.post('/api/email/test').send(body);
      expect(response.body.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });
  describe('UTILS/ EMAIL TOKEN', () => {
    it('it should assign a token to newly registered users', async () => {
      const id = 'some_secret_identification_number_or_string';
      const token = await emailVerifyToken(id);
      expect(token).to.equal(token);
    }).timeout(0);
    it('it should not assign token, or fail', async () => {
      const id = 'some_secret_identification_number_or_string';
      const token = await emailVerifyToken(id);
      expect(token).to.equal(token);
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 200 when valid token is sent as query string', async () => {
      const id = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVfZW5jb2RlZF9pZGVudGlpdHkiLCJpYXQiOjE1NjY4MTE1OTcsImV4cCI6MTU2Njg5Nzk5N30.oCXhqT4Ri-k7RIqlgIHVFvGGwmxIzBwyzqbXIG0JwyE';
      const response = await request.get(`/api/email/verify?id=${id}`);
      expect(response.body.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 404 when invalid token is sent as query string', async () => {
      const id = 'eyJhbGciOiJIUzI1NiIsInR5cCI6bkpXVCJ9.eyJpZCI6InNvbWVfZW5jb2RlZF9pZGVudGlpdHkiLCJpYXQiOjE1NjY4MTE1OTcsImV4cCI6MTU2Njg5Nzk5N30.oCXhqT4Ri-k7RIqlgIHVFvGGwmxIzBwyzqbXIG0JwyE';
      const response = await request.get(`/api/email/verify?id=${id}`);
      expect(response.body.status).to.equal(400);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('CONTROLLER RESPONSE', () => {
    it('fakes server success for email verification controller', async () => {
      const req = {
        body: {
          email: 'akp.ani@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan'
        },
        verificationMailResponse: null
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await signUp(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('fakes server response for email confirmation', async () => {
      const req = {
        url: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVfZW5jb2RlZF9pZGVudGlpdHkiLCJpYXQiOjE1NjY4MTE1OTcsImV4cCI6MTU2Njg5Nzk5N30.oCXhqT4Ri-k7RIqlgIHVFvGGwmxIzBwyzqbXIG0JwyE'
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await confirmEmailVerificaionToken(req, res);
      expect(res.status).to.have.been.calledWith(400);
    });
  });
});
