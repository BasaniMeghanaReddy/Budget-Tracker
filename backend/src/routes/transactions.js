const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const TransactionService = require('../services/transactionService');

// Get all transactions for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id || 1; // Default to user 1 for now
    const transactions = await TransactionService.getTransactionsByUser(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new transaction
router.post('/', [
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id || 1; // Default to user 1 for now
    const transaction = await TransactionService.createTransaction({
      ...req.body,
      userId
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction
router.put('/:id', [
  body('type').optional().isIn(['income', 'expense']),
  body('amount').optional().isFloat({ min: 0.01 }),
  body('category').optional().notEmpty(),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id || 1;
    const transaction = await TransactionService.updateTransaction(
      req.params.id,
      req.body,
      userId
    );
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    await TransactionService.deleteTransaction(req.params.id, userId);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction statistics
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const stats = await TransactionService.getTransactionStats(userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 