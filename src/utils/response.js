export default class Util {
  constructor() {
    this.status = null,
      this.data = null,
      this.message = null,
      this.type = null
  }

  setSuccess(statusCode, message, data, token) {
    this.statusCode = statusCode,
      this.message = message,
      this.data = data,
      this.type = 'success',
      this.token = token
  }

  setError(statusCode, message) {
    this.statusCode = statusCode,
      this.message = message,
      this.type = 'error'
  }

  // eslint-disable-next-line require-jsdoc
  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
      token: this.token
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}
