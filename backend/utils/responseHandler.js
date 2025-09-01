import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export const successResponse = (
  res,
  message = getReasonPhrase(StatusCodes.OK),
  data = null,
  statusCode = StatusCodes.OK
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res,
  message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  error = null,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
