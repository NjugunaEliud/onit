import React from 'react';
import { Search } from 'lucide-react';

const WalletsGrid = () => {
  const wallets = [
    {
      name: 'M-PESA',
      amount: 'Ksh 40,000',
      phoneNumber: '254712345678'
    },
    {
      name: 'Airtel Money',
      amount: 'Ksh 40,000',
      phoneNumber: '254734567890'
    },
    {
      name: 'T-Kash',
      amount: 'Ksh 40,000',
      phoneNumber: '254768901234'
    }
  ];

  return (
    <div className="w-full mx-auto">
      <p className='text-2xl font-semibold mb-2'>Wallets</p>
      <div className="flex justify-between items-center mb-6">
        <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
          Add
        </button>
        <div className="relative">
          <input 
            type="text"
            placeholder="Search"
            className="pl-8 w-[200px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet, index) => (
          <div 
            key={index} 
            className="p-4 flex flex-col space-y-2 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{wallet.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                Wallet
              </span>
            </div>
            <p className="text-xl font-bold">{wallet.amount}</p>
            <p className="text-gray-600 font-mono">{wallet.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletsGrid;