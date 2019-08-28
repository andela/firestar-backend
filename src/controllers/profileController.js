/* eslint-disable require-jsdoc */
import UserService from '../services/profileServices';
import Util from '../utils/index';

const util = new Util();
class UserController {
  static async updateProfile(req, res) {
    const newValues = req.body;
    const { id } = req.params;

    try {
      const updatedUser = await UserService.updateUser(id, newValues);
      if (!updatedUser) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(
        202,
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
