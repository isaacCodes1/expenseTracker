require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');  // Updated path
const { connectDB } = require('./config/dbConfig');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/expenses', expenseRoutes);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}😏`);
});
