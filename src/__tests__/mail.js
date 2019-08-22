import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';

import { signUp } from '../controllers/user';

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
      const response = await request.post('/api/email-test').send(body);
      expect(response.body.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('CONTROLLER RESPONSE', () => {
    it('fakes server success', async () => {
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
  });
});
