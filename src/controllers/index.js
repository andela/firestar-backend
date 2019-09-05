/**
 * class Root defines root apis
 * @class
 */
class Root {
  /**
   * @param {Oject} req is the request object
   * @param {Object} res is the response object
   * @static
   * @returns {void}
   */
  static async getRoot(req, res) {
    // const d = await User.findAll({});
    res.status(201).send({
      status: 201,
      data: {
        message: 'Welcome to Firestar Barefoot Nomad',
        // d,
      },
    });
  }
}
export default Root;
