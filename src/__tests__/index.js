import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

should();
use(chaiHttp);

describe('Server', () => {
  it('on success get the root', (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
