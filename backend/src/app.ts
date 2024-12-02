import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';

// Import routes
import authRoutes from './routes/auth';
import matchRoutes from './routes/match';
import messageRoutes from './routes/message';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware (optional)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/match', authMiddleware, matchRoutes);
app.use('/api/message', authMiddleware, messageRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;