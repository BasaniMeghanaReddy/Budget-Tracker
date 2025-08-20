import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { TransactionStats } from '../types';

interface StatsCardsProps {
  stats: TransactionStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(stats.total_income || 0),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.total_expense || 0),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Balance',
      value: formatCurrency(stats.balance || 0),
      icon: DollarSign,
      color: stats.balance >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.balance >= 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Total Transactions',
      value: stats.total_transactions?.toString() || '0',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon size={24} className={card.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
