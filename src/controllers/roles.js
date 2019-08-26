import { findByEmail, checkIfExistsInDb } from '../utils/checkDb';
import { User, Role } from '../models';

const changeRole = async (req, res) => {
  const { email, roleId } = req.body;
  try {
    await findByEmail(email);
    await checkIfExistsInDb(Role, roleId, 'Role does not exist');
    const updatedUser = await User.update(
      { roleId },
      {
        returning: true,
        where: {
          email
        }
      }
    );
    return res.status(200).json({
      status: 'success',
      data: updatedUser[1][0]
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};

export default changeRole;
