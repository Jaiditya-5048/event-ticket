import AppError from '../utils/AppError.js'; // adjust path as needed

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};
