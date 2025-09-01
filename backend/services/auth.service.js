import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';
import { findUserByEmail } from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

export const handleLogin = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(Messages.Auth.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(Messages.Auth.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
  }

  const token = signToken({
    user_id: user.user_id,
    email: user.email,
    role: user.role,
  });

  return { token };
};
