import React from 'react';
import { Clock, User, MessageSquare } from 'lucide-react';

export default function TransactionLedger() {
  const transactions = [
    {
      id: '0x1234...5678',
      timestamp: '2024-03-15 14:30:00',
      from: 'Anonymous',
      to: 'Alice Johnson',
      rating: 4.5,
      comment: 'Excellent leadership on the recent project launch',
    },
    {
      id: '0x8765...4321',
      timestamp: '2024-03-14 16:45:00',
      from: 'Anonymous',
      to: 'Bob Smith',
      rating: 4.8,
      comment: 'Outstanding technical contributions',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Transaction Ledger</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    Transaction: {transaction.id}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Rating: {transaction.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {transaction.timestamp}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      To: {transaction.to}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MessageSquare className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {transaction.comment}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}