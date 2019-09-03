import UserService from '../services/userServices';
import Util from '../utils/index';
import Helper from '../middlewares/index';
import CheckValidInput from '../validation/index'
const { findUserById, updateUser } = UserService;
const util = new Util();
class UserController {
  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await findUserById(id);
      const token = Helper.generateToken(id);
      console.log(token)
      if (!user) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', user);
      return util.send(res);
    } catch (error) {
      console.log('the error is here', error.message)
      util.setError(401, error.message);
      return util.send(res);
    }
  }

  static async updateUserProfile(req, res) {
    const { id } = req.params;
    if (req.user.id !== id) {
      util.setError(401, 'Unauthorized')
      return util.send(res)
    }

    const { error } = CheckValidInput.userProfile(req.body);
    if (error) {
      util.setError(422, error.details[0].message)
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
      util.setError(401, 'cannot read undefined property');
      return util.send(res);
    }
  }
}

export default UserController;
