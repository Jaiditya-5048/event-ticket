import { Sequelize } from 'sequelize';
import { DB_NAME, DB_PASSWORD, DB_USER } from './environment_variables.js';



const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

export default sequelize;
