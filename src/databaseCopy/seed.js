import models from "./models";
import dotenv from "dotenv";

const seedCopyDb = async date => {
  await models.User.create({
    email: "youremail@andela.com",
    role: "passenger"
  });

  await models.User.create({
    email: process.env.YOUR_EMAIL,
    role: "driver"
  });

  await models.Login.create({
    email: "youremail@andela.com",
    password: "password",
    token: "passe43434343nger"
  });

  await models.Login.create({
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD,
    token: "2passe43434343nger"
  });

  await models.Reset.create({
    email: "youremail@andela.com",
    password: "password"
  });
};

export default seedCopyDb;
