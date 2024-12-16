import React, { useEffect, useState } from 'react';
import { Router, Search } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface Wallets {
  accountId: string;
  accountNo: string;
  balance: number;
  bankId: string;
  companyId: string;
  type: string;
}


const WalletsGrid = () => {
  const [wallets, setWallets] = useState<Wallets[]>([]);


  useEffect(() => {
    const companyId = window.localStorage.getItem("companyId")
    const response = axios.get(`https://us-central1-onit-439704.cloudfunctions.net/accounts?company_id${companyId}`)
      .then(response => {
        console.log("Bank Virtual accounts", response.data.payload)
        setWallets(response.data.payload)
      })
      .catch(error => {
        console.log("Error", error)
      })
  }, [])

  return (
    <div className="w-full mx-auto">
      <p className='text-2xl font-semibold mb-2'>Wallets</p>
      <div className="flex justify-between items-center mb-6">
        <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
          <Link href="/createwallet">Add  A Wallet Account </Link>
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
              <div>
                <h3 className="font-semibold text-lg">Account Number</h3>
                <h3 className="font-semibold text-lg">{wallet.accountNo}</h3>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                Wallet
              </span>
            </div>
            <p className="text-gray-600 font-mono">Balance: {wallet.balance}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WalletsGrid;