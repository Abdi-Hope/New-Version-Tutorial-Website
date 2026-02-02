const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

// Configure CORS to allow all origins in development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all localhost origins in development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // In production, specify your actual frontend URL
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = [
        'https://your-frontend-domain.com',
        'https://www.your-frontend-domain.com'
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Alternatively, for development only, you can allow all origins:
// app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

module.exports = app;
