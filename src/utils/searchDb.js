import { user } from '../models';

export const checkIfExistsInDb = async (Model, id, errorMessage) => {
  try {
    const exists = await Model.findOne({
      where: {
        id
      }
    });
    if (exists) return exists.dataValues;
    throw new Error(errorMessage);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const findByEmail = async (email) => {
  const foundUser = await user.findOne({
    where: {
      email
    }
  });
  if (!foundUser) throw new Error('User with the given email does not exist');
  return foundUser.dataValues;
};
