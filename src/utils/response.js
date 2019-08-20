const errorResponse = (res, statusCode, error) => {
  return res.status(statusCode).json({
    status: "error",
    error
  });
};

const successResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "true",
    message
  });
};

export { errorResponse, successResponse };
