import {
  createNewUserService,
  deleteUserService,
  getCurrentUserDetails,
  updateUserProfile,
} from '../services/user.service.js';
import { successResponse } from '../utils/responseHandler.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';


export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const user = await getCurrentUserDetails(userId);

    if (!user) {
      throw new AppError(Messages.User.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    return successResponse(res, Messages.User.FETCH_SUCCESS, user, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const user = await createNewUserService(req.body);
    successResponse(
      res,
      Messages.User.CREATED,
      {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
       StatusCodes.CREATED
    );
  } catch (err) {
    next(err);
  }
};

export const editCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { name, phone, password } = req.body;

    const result = await updateUserProfile(userId, { name, phone, password });

    return successResponse(res, Messages.User.UPDATED, result, StatusCodes.OK);
  } catch (err) {
    next(err); // Let centralized error handler handle it
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const result = await deleteUserService(userId);

    return successResponse(res, Messages.User.DELETED, result, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
