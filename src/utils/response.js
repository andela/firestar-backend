export default class Response {
  static errorResponse(res, statusCode, err) {
    return res.status(statusCode).json({
      status: 'error',
      error: err
    });
  }

  static successResponse(res, statusCode, msg) {
    return res.status(statusCode).json({
      status: 'success',
      message: msg
    });
  }
}
