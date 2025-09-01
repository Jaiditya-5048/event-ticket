import repl from 'repl';
import Sequelize from 'sequelize';
import models from './models/index.js';
import { DB_NAME, DB_PASSWORD, DB_USER } from './config/environment_variables.js';

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Initialize and attach models
for (const modelName in models) {
  const model = models[modelName];
  if (model.initModel) {
    models[modelName] = model.initModel(sequelize);
  }
}

// Sync if needed
await sequelize.authenticate();
console.log('✅ Connected to MySQL database.');

const replServer = repl.start({
  prompt: '🧠 Sequelize > ',
  useGlobal: true,
});

// Make models and sequelize available globally
replServer.context.sequelize = sequelize;
for (const modelName in models) {
  replServer.context[modelName] = models[modelName];
}

console.log('🧪 Console ready. Try: await User.findAll()');
