import UserService from '../services/userServices';
import Util from '../utils/response';
import Helper from '../middlewares/index';
const { findUserById, updateUser } = UserService;
const util = new Util();

/** Class representing user controller. */
class UserController {
  /**
  * get user profile
  * @param {Object} req - server request
  * @param {Object} res - server response
  * @returns {Object} - custom response
  * @description get details of registered user
  */
  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await findUserById(id);
      const token = Helper.generateToken(id);

      if (!user) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', user, token);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  /**
  * update user profile
  * @param {Object} req - server request
  * @param {Object} res - server response
  * @returns {Object} - custom response
  * @description get's details of registered user
  */
  static async updateUserProfile(req, res) {
    const { id } = req.params;
    if (req.user.id !== id) {
      util.setError(403, 'Unauthorized')
      return util.send(res)
    }

    const {
      firstName, lastName, birthdate, preferredLanguage,
      preferredCurrency, gender, company, lineManager,
      residentialLocation, countryCode, department
    } = req.body;

    try {
      const userDetails = {
        firstName, lastName, birthdate, preferredLanguage,
        preferredCurrency, gender, company, lineManager,
        residentialLocation, countryCode, department
      };
      const updatedUser = await updateUser(id, userDetails);

      util.setSuccess(
        201,
        'You ve successfully updated your profile',
        updatedUser
      );
      return util.send(res);
    } catch (error) {
      util.setError(403, 'undefined property');
      return util.send(res);
    }
  }
}

export default UserController;
