// config/environment.js (or environment.ts if you're using TypeScript)
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Access environment variables using process.env
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const BYCRYPY_SALT_ROUND = process.env.BYCRYPY_SALT_ROUND;

// Export the variables so they can be used elsewhere in your app
export {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  BYCRYPY_SALT_ROUND
};
