import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import apiRouter from './routes/index.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(logger);

// Mount API routes
app.use('/api', apiRouter);

// Fallback route for undefined paths
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found. Visit /api/health for system status.`,
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Campus Connect API Server running at http://localhost:${config.port}`);
  console.log(`📡 Health check available at http://localhost:${config.port}/api/health`);
});
