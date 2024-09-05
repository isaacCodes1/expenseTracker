// src/models/expenseModel.js
const mongoose = require('mongoose');

// Define the expense schema
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'JPY', 'INR'] // List currencies as needed
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Entertainment', 'Health', 'Other'] // List categories as needed
  },
  flagged: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

// Create a model from the schema
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
