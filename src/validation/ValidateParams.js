/**
  * Class for validating request parameters
  * @class
  */
class ValidateParams {
  /**
     * @param {number} params request parameter to be validated
     * @static
     * @returns {void}
     */
  static evaluate(params) {
    params.toString().split('').forEach((element) => {
      if (Number.isNaN(parseInt(element, 10))) { throw new Error('bad input'); }
    });
  }
}

export default ValidateParams;
