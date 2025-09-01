import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  softDeleteUserById,
  updateUserById,
} from '../repositories/user.repository.js';
import Messages from '../utils/responseMessages.js';
import { formatName } from '../utils/inputSanitize.js';
import AppError from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

dayjs.extend(advancedFormat);

export const getCurrentUserDetails = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(Messages.User.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  const { name, email, phone, createdAt } = user.toJSON();

  return {
    name,
    email,
    phone,
    createdAt,
  };
};

export const createNewUserService = async (data) => {
  let { name, email, password, phone } = data;
  name = formatName(name);

  const existing = await findUserByEmail(email);
  if (existing) throw new AppError(Messages.User.EMAIL_ERROR, StatusCodes.CONFLICT);
  return await createUser(data);
};

export const updateUserProfile = async (userId, data) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(Messages.User.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  const updatedFields = {};

  if (data.name) updatedFields.name = data.name;
  if (data.phone) updatedFields.phone = data.phone;

  // Execute update
  const [affectedRows] = await updateUserById(userId, updatedFields);

  // Handle failure
  if (affectedRows === 0) {
    throw new AppError(Messages.General.ERROR_NO_CHANGES, StatusCodes.BAD_REQUEST);
  }
  const Updateduser = await findUserById(userId);


  return Updateduser;
};

export const deleteUserService = async (id) => {
  const deleted = await softDeleteUserById(id);

  if (deleted === 0) {
    throw new AppError(Messages.User.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  return { message: Messages.User.DELETED };
};
