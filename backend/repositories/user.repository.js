import db from '../models/index.js';
const { User } = db;

export const findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

export const findUserById = (id) => {
  return User.findByPk(id, {
    attributes: ['name', 'email', 'phone', 'createdAt'],
  });
};

export const createUser = (userData) => {
  return User.create(userData);
};

export const updateUserById = async (user_id, updatedData) => {
  return User.update(updatedData, {
    where: { user_id },
  });
};

export const softDeleteUserById = (user_id) =>
  User.destroy({ where: { user_id } });
