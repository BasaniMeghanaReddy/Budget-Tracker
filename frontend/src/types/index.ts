export interface Transaction {
  id: number;
  user_id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionStats {
  total_income: number;
  total_expense: number;
  balance: number;
  total_transactions: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 