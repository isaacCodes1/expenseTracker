const Expense = require('../models/expenseModel');
const { convertCurrency } = require('../utils/currencyConverter');

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { description, amount, currency, date, category } = req.body;

    // Convert amount to base currency (e.g., USD)
    const convertedAmount = await convertCurrency(amount, currency, 'USD');
    
    const expense = new Expense({
      description,
      amount: convertedAmount,
      currency: 'USD',  // Store in base currency
      date,
      category
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all expenses with filtering, sorting, and conversion
const getExpenses = async (req, res) => {
  try {
    const { category, dateRange, flagged, currency } = req.query;
    const filter = { deleted: false };

    if (category) filter.category = category;
    if (flagged) filter.flagged = flagged === 'true';
    
    // Fetch expenses
    let expenses = await Expense.find(filter);

    // Currency conversion
    if (currency && currency !== 'USD') {
      expenses = await Promise.all(
        expenses.map(async (expense) => {
          const convertedAmount = await convertCurrency(expense.amount, 'USD', currency);
          return { ...expense._doc, amount: convertedAmount, currency };
        })
      );
    }

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an expense by ID
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency, description, category } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Convert new amount if currency is provided
    if (amount && currency) {
      expense.amount = await convertCurrency(amount, currency, 'USD');
      expense.currency = 'USD'; // Store in base currency
    }
    
    if (description) expense.description = description;
    if (category) expense.category = category;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense.deleted = true;
    await expense.save();
    res.json({ message: 'Expense soft-deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
