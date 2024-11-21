import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

const DataStatsTwo = () => {
  const accounts = Array(3).fill({
    bank: 'Onit Bank',
    amount: 'Ksh 40,000',
    accountNumber: '903485093485093'
  });

  return (
    <div className="w-full  mx-auto">
      <p className='text-2xl font-semibold mb-2'>Bank Accounts</p>
      <div className="flex justify-between items-center mb-6">
     
         <Link className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50" href="/createaccount"> Add Account</Link>
       
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
        {accounts.map((account, index) => (
          <div 
            key={index} 
            className="p-4 flex flex-col space-y-2 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <h3 className="font-semibold text-lg">{account.bank}</h3>
            <p className="text-xl font-bold">{account.amount}</p>
            <p className="text-gray-600 font-mono">{account.accountNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataStatsTwo;