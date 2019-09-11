import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../../../helpers/helperUtils';
import models from '../../../models';
import app from '../../../index';

chai.use(chaiHttp);
chai.should();

const loginUrl = '/api/v1/users/auth/login';

const wrongUserLoginDetails = {
  email: 'example00@gmail.com',
  password: 'firestar2019@K',
};

const userLoginDetails = {
  email: 'example1@gmail.com',
  password: 'firestar2019@K',
};

const userToken = '';

// Create table and seed database
const seedTestDb = async () => {
  try {
    await models.User.create({
      username: 'iammarusoft',
      firstName: 'alimi',
      lastName: 'marusoft',
      email: 'example@gmail.com',
      isVerified: true,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.User.create({
      username: 'iammarusoft1',
      firstName: 'alimi1',
      lastName: 'marusoft1',
      email: 'example1@gmail.com',
      isVerified: true,
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.User.create({
      username: 'iammarusoft2',
      firstName: 'alimi2',
      lastName: 'marusoft2',
      email: 'example2@gmail.com',
      roleId: 5,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.User.create({
      username: 'iammarusoft3',
      firstName: 'alimi3',
      lastName: 'marusoft3',
      email: 'example3@gmail.com',
      roleId: 5,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.Login.create({
      email: 'example@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.Login.create({
      email: 'example1@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.Login.create({
      email: 'example2@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await models.Login.create({
      email: 'example3@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};


// Clear tables of seed
const clearTestDb = async () => {
  try {
    await models.User.sync({ force: true });
    await models.Login.sync({ force: true });
  } catch (err) {
    throw err;
  }
};

function loadBeforeAndAfter() {
  // clear database and seed data before test
  before(async () => {
    try {
      await clearTestDb();
      await seedTestDb();
    } catch (err) {
      throw err;
    }
  });
  after(async () => {
    try {
      await clearTestDb();
    } catch (err) {
      throw err;
    }
  });
}

describe('Login Users', () => {
  loadBeforeAndAfter();
  it('should login a user and generate token for user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        ...wrongUserLoginDetails
      })
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.have.property('error');
        res.body.error.should.equal('You don\'t have have an account. Please signup');
        done();
      });
  });

  it('should login a user and generate token for user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        ...userLoginDetails
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const validUser = Helper.verifyToken(userToken);
        validUser.should.be.an('boolean');
        done();
      });
  });

  it('should return 200 for successful Login', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com',
        password: 'firestar2019@K',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.message.should.equal('Welcome back, your login was successful');
        done();
      });
  });

  it('should return 400 for undefined Login details', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.deep.own.include({ email: 'Email is required', password: 'Password is required' });
        done();
      });
  });

  it('should return 400 for undefined Login password detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return 401 for incorrect password login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com',
        password: 'barefoot2019@Kkk',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.error.should.equal('Email or password incorrect');
        done();
      });
  });

  it('should return 401 for accounts that is not verified', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example3@gmail.com',
        password: 'barefoot2019@K',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.equal('Account is not verified');
        done();
      });
  });

  it('should return 404 for email not exist for login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com111',
        password: 'barefoot2019@K',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.be.equal('You don\'t have have an account. Please signup');
        done();
      });
  });
});
