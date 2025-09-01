import cors from 'cors';
import express from 'express';
import db from './models/index.js';
import searchRoutes from './routes/search_routes.js';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';
import eventRoutes from './routes/event_routes.js';
import instanceRoutes from './routes/instance_routes.js';
import organizserRoutes from './routes/organiser_routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { PORT } from './config/environment_variables.js';


const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.22:5173',
  'http://localhost:5000',
  'http://localhost:5175'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API base route

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/instances', instanceRoutes);
app.use('/organiser', organizserRoutes);
app.use('/search', searchRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to event_spot');
});

app.use(globalErrorHandler);

// swagger setup+
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Initialize DB connection and start server
try {
  await db.sequelize.authenticate();
  console.log('✅ DB connected');

  // No sync() here, assuming tables already exist
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.error('❌ DB connection failed:', err);
}
