/* eslint-disable require-jsdoc */
/* eslint-disable new-parens */
import UserService from '../services/UserServices';
import Util from '../utils/index';

const util = new Util;
class UserController {
  static async updateProfile(req, res) {
    const newProfile = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(401, `User with ${id} not found`);
      return util.send(res);
    }
    try {
      const updatedUser = await UserService.updateUser(id, newProfile);
      if (!updatedUser) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(201, 'You ve successfully updated your profile', newProfile);
      return util.send(res);
    } catch (error) {
      util.setError(401, error);
      return util.send(res);
    }
  }
}

export default UserController;
