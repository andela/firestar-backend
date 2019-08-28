import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const { assert } = chai;

describe('Login', () => {
  it('Should generate Token', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'abc123@gmail.com' });

    assert.equal(res.status, 200);
    assert.hasAnyKeys(res.body, 'token');
    assert.isString(res.body.token);
  });
  it('Should generate Token', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'doesnotexist@gmail.com' });

    assert.equal(res.status, 404);
  });
});
