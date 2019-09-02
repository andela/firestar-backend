/* eslint-disable require-jsdoc */
import UserService from '../services/userServices';
import Util from '../utils/index';
import Helper from '../middlewares/index';

const { findUserById, updateUser } = UserService;
const util = new Util();
class UserController {
  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await findUserById(id);
      const token = Helper.generateToken(id, user.email);
      console.log(token)
      if (!user) {
        util.setError(401, `User with id ${id} does not exist`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', user);
      return util.send(res);
    } catch (error) {
      util.setError(401, error);
      return util.send(res);
    }
  }

  static async updateUserProfile(req, res) {
    const { id } = req.params;
    console.log(id)
    console.log(req.user.id)
    if (req.user.id !== id) {
      util.setError(401, 'Unauthorized')
      return util.send(res)
    }
    const {
      firstName, lastName, birthdate, preferredLanguage,
      preferredCurrency, gender, company, lineManager,
      residentialLocation, countryCode, department
    } = req.body;

    try {
      const values = {
        firstName, lastName, birthdate, preferredLanguage,
        preferredCurrency, gender, company, lineManager,
        residentialLocation, countryCode, department
      };
      const updatedUser = await updateUser(id, values);

      util.setSuccess(
        201,
        'You ve successfully updated your profile',
        updatedUser
      );
      return util.send(res);
    } catch (error) {
      util.setError(401, error);
      return util.send(res);
    }
  }
}

export default UserController;
