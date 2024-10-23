const express = require('express');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
const cors = require('cors'); // Import CORS


const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test the database connection
sequelize.sync().then(() => console.log('Database connected'));

module.exports = app;
