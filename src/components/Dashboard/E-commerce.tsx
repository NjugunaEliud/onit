"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

// Updated interfaces to match the provided response structure
interface Wallet {
  id: string;
  accountNo: string;
  balance: number;
  bankId: string;
  userId?: string;
  companyId?: string;
  accType?: string;
  name?: string;
  phoneNo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface BankVirtualAccount {
  accountId: string;
  accountNo: string;
  balance: number;
  bankId: string;
  companyId: string;
  type: string;
}

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    walletId: '',
    phone: '',
    amount: 0,
    charges: 2
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = [
    { name: 'Group 1', primary: 35, secondary: 45 },
    { name: 'Group 2', primary: 40, secondary: 50 },
    { name: 'Group 3', primary: 45, secondary: 40 }
  ];

  const recentTransactions = [
    {
      type: "C2B",
      dateTime: "00/00/000 00:00 pm",
      amount: "+2,000",
      accountNumber: "904395803444035"
    },
    {
      type: "C2B",
      dateTime: "00/00/000 00:00 pm",
      amount: "+2,000",
      accountNumber: "904395803444035"
    },
    {
      type: "C2B",
      dateTime: "00/00/000 00:00 pm",
      amount: "+2,000",
      accountNumber: "904395803444035"
    },
    {
      type: "C2B",
      dateTime: "00/00/000 00:00 pm",
      amount: "+2,000",
      accountNumber: "904395803444035"
    }
  ];

  const periods = ['24 hrs', '7 Days', '30 Days', '12 Months'];

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankVirtualAccount[]>([]);

  useEffect(() => {
    const companyId = window.localStorage.getItem("companyId")
    if (companyId) {
      axios.get(`https://us-central1-onit-439704.cloudfunctions.net/accounts?company_id=${companyId}`)
        .then(response => {
          console.log("Bank Virtual accounts", response.data.payload)
          setBankAccounts(response.data.payload)
        })
        .catch(error => {
          console.log("Error fetching bank accounts", error)
          toast.error("Failed to fetch bank accounts");
        })
    }
  }, [])

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    const companyId = window.localStorage.getItem("companyId");
    const role = window.localStorage.getItem("role");
  
    if (id) {
      const endpoint = role === 'admin'
        ? `https://us-central1-onit-439704.cloudfunctions.net/wallet?company_id=${companyId}`
        : `https://us-central1-onit-439704.cloudfunctions.net/wallet?user_id=${id}`;
  
      axios.get(endpoint)
        .then(response => {
          console.log("Wallets", response.data.payload);
          setWallets(response.data.payload);
        })
        .catch(error => {
          console.log("Error fetching wallets", error);
          toast.error("Failed to fetch wallets");
        });
    }
  }, []);
  

  const toggleModal = (wallet: Wallet | null) => {
    setIsModalOpen(!isModalOpen);
    setModalData(wallet);
    setFormData({
      walletId: wallet?.id || '',
      phone: wallet?.phoneNo || '',
      amount: 1,
      charges: 2
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Log the formData before making the request
    console.log('Submitting the following data:', {
      wallet_id: formData.walletId,
      phone_number: formData.phone,
      charges: formData.charges,
      amount: formData.amount,
    });
    try {
      const response = await axios.post(
        'https://us-central1-onit-439704.cloudfunctions.net/c2b',
        {
          wallet_id: formData.walletId,
          phone_number: formData.phone,
          charges: formData.charges,
          amount: formData.amount
        },
        {
          headers: {
            'Consumer-Key': '5f11cfda2e3962908b2936d801c3002d502bf93fffb2187a540cf6820a7cdfc2',
            'Consumer-Secret': 'b8e0a1f2249c88e7b321093dd1e2e38f6be5f92c4c4ac2f8f17263ce7dab9f85',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjExY2ZkYTJlMzk2MjkwOGIyOTM2ZDgwMWMzMDAyZDUwMmJmOTNmZmZiMjE4N2E1NDBjZjY4MjBhN2NkZmMyIiwia2V5IjoiNWYxMWNmZGEyZTM5NjI5MDhiMjkzNmQ4MDFjMzAwMmQ1MDJiZjkzZmZmYjIxODdhNTQwY2Y2ODIwYTdjZGZjMiIsInNlY3JldCI6ImI4ZTBhMWYyMjQ5Yzg4ZTdiMzIxMDkzZGQxZTJlMzhmNmJlNWY5MmM0YzRhYzJmOGYxNzI2M2NlN2RhYjlmODUiLCJpYXQiOjE3MzMzMTE5NzMsImV4cCI6MTczMzMxNTU3M30.z4RLkNpxezIWEoc-NU18dIlqIT0fBq6VIQhK2Mrjnjk',
            // 'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('C2B Transaction Response:', response.data);
       toast.success('STK Push initiated successfully!');
      console.log('C2B Transaction Response:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      // Handle error
      console.error('Error initiating C2B transaction:', error);
      toast.error('Failed to initiate transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 ">
      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Modal */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Transfer Funds</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet ID</label>
                <input
                  type="text"
                  name="walletId"
                  value={formData.walletId}
                  readOnly
                  className="w-full border rounded-lg p-2 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg p-2"
                  required
                  pattern="^(0|254)\d{9}$"
                  placeholder="254719196591"
                />
                <p className="text-xs text-gray-500 mt-1">Please enter phone number in format 254XXXXXXXXX</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg p-2"
                  required
                  min="1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-lg ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#fbac63] hover:bg-[#e89853]'
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Initiating stk push...' : 'Initiate payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the Dashboard component remains the same */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex flex-wrap bg-white rounded-lg shadow-sm w-full sm:w-auto">
            {periods.map((period, index) => (
              <button
                key={index}
                className={`px-2 sm:px-4 py-2 text-sm flex-1 sm:flex-none whitespace-nowrap
                    first:rounded-l-lg last:rounded-r-lg
                    ${period === '24 hrs' ? 'bg-[#fbac63] text-white' : 'hover:bg-gray-100'}`}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm whitespace-nowrap text-sm">
              Select Dates
            </button>
            <button className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Bank Virtual Accounts Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Bank Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankAccounts.map((account, index) => (
              <div
                key={index}
                className="p-4 flex flex-col space-y-2 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div>
                  <h3 className="font-semibold text-lg">Account Number</h3>
                  <h3 className="font-semibold text-lg">{account.accountNo}</h3>
                </div>
                <p className="text-gray-600 font-mono">Balance: {account.balance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet, index) => (
              <div
                key={index}
                className="p-4 flex flex-col space-y-2 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div>
                  <h3 className="font-semibold text-lg">Account Number</h3>
                  <h3 className="font-semibold text-lg">{wallet.accountNo}</h3>
                </div>
                <p className="text-gray-600 font-mono">Balance: {wallet.balance}</p>
                <button
                  onClick={() => toggleModal(wallet)}
                  className="px-4 py-2 bg-[#fbac63] text-white rounded-lg hover:bg-[#e89853]"
                >
                  Deposit Funds
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Primary Bank Account</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="primary" fill="#056cf2" />
                <Bar dataKey="secondary" fill="#fbac63" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">{transaction.type}</h3>
                  <p className="text-gray-600">{transaction.dateTime}</p>
                </div>
                <div>
                  <p className="text-sm font-mono">{transaction.amount}</p>
                  <p className="text-gray-600 text-sm">{transaction.accountNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;