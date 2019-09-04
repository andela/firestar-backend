import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('request route', () => {
  it('should throw an error if requesterId is missing', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: '',
        managerId: 4,
        reasons: 'business trip'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if managerId is missing', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: '2',
        managerId: '',
        reasons: 'business trip'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if reasons is missing', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: '2',
        managerId: '4',
        reasons: ''
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if requesterId is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: 'r',
        managerId: 4,
        reasons: 'business trip'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if managerId is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: '2',
        managerId: 'f',
        reasons: 'business trip'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should successfully create a request', (done) => {
    chai.request(app)
      .post('/api/v1/requests')
      .send({
        requesterId: '2',
        managerId: 4,
        reasons: 'business trip'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });
});
