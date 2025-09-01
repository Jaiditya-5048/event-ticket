import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Missing or invalid token', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (_) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

export default authenticate;
