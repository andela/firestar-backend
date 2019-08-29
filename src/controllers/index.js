
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
  static getRoot(req, res) {
    res.status(201).send({
      status: 201,
      data: {
        message: 'Welcome to Barefoot Nomad',
      },
    });
  }
}
export default Root;
