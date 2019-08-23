import models from '../models';

const seedCopyDb = async () => {
  await models.User.create({
    email: 'youremail@andela.com',
    role: 'passenger'
  });

  await models.User.create({
    email: process.env.YOUR_EMAIL,
    role: 'driver'
  });

  await models.Login.create({
    email: 'youremail@andela.com',
    password: 'password'
  });

  await models.Login.create({
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD
  });

  await models.Reset.create({
    email: 'youremail@andela.com',
    password: 'password'
  });
};

export default seedCopyDb;
