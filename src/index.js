import express from 'express';
import cors from 'cors';

import { chaiRouter } from './routes/chaiRouter.js';

const app = express();

app.use(express.json());
// Configure CORS with specific allowed origins
const allowedOrigins = [
    'http://localhost:5173', // Default Vite dev server
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all requests
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//     next();
// });

app.use('/api/chai', chaiRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

