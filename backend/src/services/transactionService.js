const db = require('../config/database');

class TransactionService {
  static async getTransactionsByUser(userId) {
    const query = `
      SELECT * FROM transactions 
      WHERE user_id = $1 
      ORDER BY date DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async createTransaction(transactionData) {
    const { userId, type, category, amount, description } = transactionData;
    const query = `
      INSERT INTO transactions (user_id, type, category, amount, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await db.query(query, [userId, type, category, amount, description]);
    return result.rows[0];
  }

  static async updateTransaction(id, updateData, userId) {
    const { type, category, amount, description } = updateData;
    const query = `
      UPDATE transactions 
      SET type = COALESCE($1, type),
          category = COALESCE($2, category),
          amount = COALESCE($3, amount),
          description = COALESCE($4, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 AND user_id = $6
      RETURNING *
    `;
    const result = await db.query(query, [type, category, amount, description, id, userId]);
    
    if (result.rows.length === 0) {
      throw new Error('Transaction not found or access denied');
    }
    
    return result.rows[0];
  }

  static async deleteTransaction(id, userId) {
    const query = `
      DELETE FROM transactions 
      WHERE id = $1 AND user_id = $2
    `;
    const result = await db.query(query, [id, userId]);
    
    if (result.rowCount === 0) {
      throw new Error('Transaction not found or access denied');
    }
  }

  static async getTransactionStats(userId) {
    const query = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance,
        COUNT(*) as total_transactions
      FROM transactions 
      WHER 