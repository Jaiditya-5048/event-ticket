import { handleLogin } from '../services/auth.service.js';
import { successResponse } from '../utils/responseHandler.js';

export const authLogin = async (req, res, next) => {
  try {
    const result = await handleLogin(req.body);
    
    successResponse(res, 'Login successful', {
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};
