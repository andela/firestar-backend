import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../index';

chai.use(chaiHttp);
let request;

const { expect } = chai;


describe('EMAIL ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  describe('Test for getting undefined routes', () => {
    it('should return 200 for the default route', async () => {
      const response = await request.post('/');

      expect(response.status).to.equal(404);
      expect(response.body.errors.message).to.equal('Not Found');
    });
  });
});
