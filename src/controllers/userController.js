/* eslint-disable require-jsdoc */
import UserService from '../services/userServices';
import Util from '../utils/index';

const util = new Util();
class UserController {
  static async getUserProfile(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(401, `User with the ${id} is not valid`);
      return util.send(res);
    }
    try {
      const theUser = await UserService.getAuser(id);
      if (!theUser) {
        util.setError(401, `User with id ${id} does not exist`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', theUser);
      return util.send(res);
    } catch (error) {
      util.setError(401, error);
      return util.send(res);
    }
  }

  static async updateUserProfile(req, res) {
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
