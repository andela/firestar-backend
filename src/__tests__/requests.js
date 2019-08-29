import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

should();
use(chaiHttp);

describe('GET a user travel requests endpoint', () => {
  it('return error if invalid parameter', (done) => {
    request(server)
      .get('/api/v1/requests/1a')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('on success get the users requests', (done) => {
    request(server)
      .get('/api/v1/requests/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
