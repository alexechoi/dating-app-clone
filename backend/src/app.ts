import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './utils/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import matchRoutes from './routes/match';
import messageRoutes from './routes/message';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/message', messageRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;