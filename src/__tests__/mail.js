import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';


chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

 describe('/EMAIL VERIFICATION ROUTE', () => {
   it('It shoud return 200 success message', function (done) {
    
		this.timeout(10000);
    

    const body = {
      email: 'akp.ani@yahoo.com',
      firstName: 'Aniefiok',
      lastName: 'Akpan'
    };
     chai.request(app)
       .post('/api/email-test')
       .send(body)
       .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.a('object');      
        done();
       });
   });
 });
 
