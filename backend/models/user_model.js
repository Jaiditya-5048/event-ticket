import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { BYCRYPY_SALT_ROUND } from '../config/environment_variables.js';

const UserModel = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: [['user', 'organiser', 'admin']],
        },
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: 'Users',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, Number(BYCRYPY_SALT_ROUND));
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password') && !isPasswordHashed(user.password)) {
            user.password = await bcrypt.hash(user.password, Number(BYCRYPY_SALT_ROUND));
          }
        },
      },
    }
  );

  return User;
};

export default UserModel;










