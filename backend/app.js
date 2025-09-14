import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser"
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import ErrorMiddleware from './middlewares/errorMiddleware.js';
import { seedDatabase } from './utils/seedDatabase.js';
import mongoose from 'mongoose';
import connectDatabase from './config/db.js';

const app = express();

//Security middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
const corsOptions = {
    origin: ['https://tenant-lilac.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

//Api routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/note', noteRoutes);
app.use('/api/v1/tenant', tenantRoutes);

app.get('/api/test-db-connection', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.disconnect();
    res.status(200).json({ status: 'ok', message: 'Successfully connected to MongoDB Atlas.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to connect to MongoDB Atlas.', error: error.message });
  }
});

//Seed database
app.get('/api/v1/seed', async (req, res) => {
    try {
        await connectDatabase(); // Ensure the database connection is established
        await seedDatabase();
        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database seeding failed', error: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Multi-Tenant SaaS Notes API is running',
        endpoints: {
            health: '/health',
            auth: '/api/v1/auth/*',
            notes: '/api/v1/notes/*',
            tenants: '/api/v1/tenants/:slug/upgrade'
        }
    });
});

// Global error handler
app.use(ErrorMiddleware);

export default app;
//mongodb+srv://shubhamkumarrai212_db_user:M2UplR4Ka6QKE0GZ@cluster0.wugewzl.mongodb.net/