import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';

import { jwtVerifyUserToken } from '../utils/index';
import { hashPassword, comparePassword } from '../helpers/index';
import { validateData, signUpValidationSchema } from '../utils/validation/signupValidation';
import { jwtVerify, authorization } from '../middlewares/auth/auth';
import userController from '../controllers/userController';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;
let tokenEmail;
let UserId;

describe('SIGNUP ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());


  describe('SIGNUP SUCCESSFULLY', () => {
    it('should have a status of 201 when user is created', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma8760@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      token = response.body.data.token;
      tokenEmail = response.body.data.emailToken;
      UserId = response.body.data.id;
      expect(response.status).to.equal(201);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('ACCOUNT VERIFICATION DURING SIGNUP', () => {
    it('should have a status of 200 when user verify is account', async () => {
      const id = tokenEmail;
      const response = await request.get(`/api/v1/users/email/verify?id=${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('JWT VERIFY SIGNUP TOKEN', () => {
    it('should verify token', async () => {
      const response = await jwtVerifyUserToken(token);
      expect(response.id).to.equal(UserId);
    }).timeout(0);
  });

  describe('HASHPASWORD AND COMPAREPASSWORD', () => {
    it('should hash passowrd for user', async () => {
      const password = 'dfdfdfg33gf';
      const hashPass = await hashPassword(password);
      const decoded = await comparePassword(hashPass, password);
      expect(decoded).to.equal(true);
    }).timeout(0);
  });

  describe('VALIDATE USING JOI LIBRARY', () => {
    it('should validate joi schema', () => {
      const body = {
        email: 'akps.dd@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma340##@@'
      };
      const response = validateData(body, signUpValidationSchema);
      expect(response).to.be.a('object');
      expect(response).to.have.property('error').equal(null);
    }).timeout(0);

    it('Spy function for validatiedate() method', () => {
      const body = {
        email: 'akps.dd@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma340##@@'
      };
      const res = {
        validate: validateData
      };

      const setSpy = sinon.spy(res, 'validate');

      res.validate(body, signUpValidationSchema);

      expect(setSpy.callCount).to.equal(1);
      setSpy.restore();
    }).timeout(0);
  });

  describe('SIGNUP NOT SUCCESSFULLY', () => {
    it('should have a status of 400 with a message of "firstname must be a minimum of 3 character and max of 30" when firstName is below two character or above 30', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'An',
        lastName: 'Akpan',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('firstname must be a minimum of 3 character and max of 30');
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 400 with a message of "lastName must be a minimum of 3 character and max of 30" when lastName is below two character or above 30', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Ak',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('lastname must be a minimum of 3 character and max of 30');
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 400 with a message of "Your email is not valid" when invalid email is provided', async () => {
      const body = {
        email: 'akps.iahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Your email is not valid');
      expect(response.body).to.be.a('object');
    }).timeout(0);


    it(`should have a status of 400 with a message of
     "Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character" when password does not meet the required`, async () => {
      const body = {
        email: 'akps.a@iahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma250'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character');
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('PROTECTED ROUTE TEST', () => {
    it('should welcome user to the proctected route endpoint', async () => {
      const response = await request.get('/api/v1/users/myaccount')
        .set('Authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should say proctected route when token is not present', async () => {
      const response = await request.get('/api/v1/users/myaccount')
        .set('Authorization', tokenEmail);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('STUBS FOR AUTH MIDDLEWARE', () => {
    it('reproduce server response when token is not valid /JWTVERIFY', async () => {
      const req = {
        token: tokenEmail,
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'token').throws();

      await jwtVerify(req, res);

      expect(res.status).to.have.been.calledWith(401);
    });

    it('Go to the next middleware when no error in JWTVERIFY', async () => {
      const req = {
        token,
      };
      const res = {
        status() {},
        json() {},
      };

      const next = () => 2;

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'token').throws();

      await jwtVerify(req, res, next);
    });

    it('Go to the next middleware when no error in Authorization', async () => {
      const req = {
        header() {
        },
      };
      const res = {
        status() {},
        json() {},
      };

      const next = () => 2;

      sinon.stub(req, 'header').returnsThis();
      await authorization(req, res, next);

      expect(req.header).to.have.been.calledWith('Authorization');
    });

    it('reproduce server response when token is not available in Header as Authorization', async () => {
      const req = {
        header() {}
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await authorization(req, res);

      expect(res.status).to.have.been.calledWith(401);
    });
  });

  describe('STUBS FOR USERCONTROLLER', () => {
    it('reproduce server response to when user exist already in database', async () => {
      const req = {
        user: {
          email: 'akps.i@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan',
          password: 'EMma250@@'
        },
        tokenEmail
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await userController.addUser(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('reproduce server response to add a new user to database with statuscode of 201', async () => {
      const req = {
        user: {
          email: 'akps.ani@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan',
          password: '43DFsd&&'
        },
        tokenEmail
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await userController.addUser(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });
});
