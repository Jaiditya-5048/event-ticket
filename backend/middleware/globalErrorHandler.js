import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { errorResponse } from '../utils/responseHandler.js';

const globalErrorHandler = (err, req, res, next) => {
  console.error('🔥 GLOBAL ERROR:', err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || getReasonPhrase(statusCode);

  return errorResponse(
    res,
    message,
    process.env.NODE_ENV === 'development' ? err.stack : null,
    statusCode
  );
};

export default globalErrorHandler;
