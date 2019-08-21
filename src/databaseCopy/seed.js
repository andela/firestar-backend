import models from "./models";

const seedCopyDb = async date => {
  await models.User.create();

  await models.Reset.create();

  await models.Login.create();
};

export default seedCopyDb;
