const errorResponse = (res, statusCode, err) => {
  return res.status(statusCode).json({
    status: 'error',
    error: err
  });
};

const successResponse = (res, statusCode, msg) => {
  return res.status(statusCode).json({
    status: 'success',
    message: msg
  });
};

export { errorResponse, successResponse };
