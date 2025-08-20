import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Transaction, TransactionStats } from '../types';
import { transactionAPI } from '../services/api';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { StatsCards } from '../components/StatsCards';
import { ExpenseChart } from '../components/ExpenseChart';

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    total_transactions: 0
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsRes, statsRes] = await Promise.all([
        transactionAPI.getAll(),
        transactionAPI.getStats()
      ]);
      
      setTransactions(transactionsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (transactionData: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await transactionAPI.create(transactionData);
      setTransactions(prev => [response.data, ...prev]);
      await fetchData(); // Refresh stats
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    // TODO: Implement edit functionality
    console.log('Edit transaction:', transaction);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await transactionAPI.delete(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      await fetchData(); // Refresh stats
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
            <p className="text-gray-600">Manage your income and expenses</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Charts and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <TransactionList
                transactions={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </div>

          {/* Expense Chart */}
          <div className="lg:col-span-1">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>

        {/* Transaction Form Modal */}
        <TransactionForm
          isOpen={isFormOpen}
          onSubmit={handleAddTransaction}
          onCancel={() => setIsFormOpen(false)}
        />
      </div>
    </div>
  );
}; 