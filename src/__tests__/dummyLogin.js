import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../index';
import models from '../models';
import { users } from '../__mocks__/userRoles';

chai.use(chaiHttp);

const { assert } = chai;

describe('Login', () => {
  before(async () => {
    await models.users.sync({ force: true });
    await models.users.bulkCreate([users.superAdmin, users.nonadmin]);
  });
  after(async () => {
    await models.users.destroy({ where: {} });
  });
  it('Should generate Token', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'abc123@gmail.com' });

    assert.equal(res.status, 200);
    assert.hasAnyKeys(res.body, 'token');
    assert.isString(res.body.token);
  });
  it('Should not generate Token', async () => {
    const res = await chai

      .request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'doesnotexist@gmail.com' });

    assert.equal(res.status, 404);
  });
});
