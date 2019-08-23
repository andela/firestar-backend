/* eslint-disable new-parens */
import UserService from '../services/UserServices';
import Util from '../utils/index';

const util = new Util;
class UserController {
  static async getAuser(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(404, `User with the ${id} is not valid`);
      return util.send(res);
    }
    try {
      const theUser = await UserService.getAuser(id);
      console.log(theUser);
      if (!theUser) {
        util.setError(401, `User with id ${id} does not exist`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', theUser);
      return util.send(res)
    } catch (error) {
      util.setError(401, error);
      return util.send(res);
    }
  }
}

export default UserController;
