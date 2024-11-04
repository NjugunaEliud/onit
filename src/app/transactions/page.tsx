"use client"
import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

interface Transaction {
  transactionId: string;
  accountNumber: string;
  amount: number;
  charges: number;
  transactionType: string;
  dateTime: string;
  status: string;
}

const dummyTransactions: Transaction[] = [
  {
    transactionId: 'CH5563L5DK',
    accountNumber: '987987',
    amount: 6000,
    charges: 10,
    transactionType: 'C2B',
    dateTime: '00/00/000 00:00 pm',
    status: 'COMPLETE'
  },
  {
    transactionId: 'CH5563L5DK',
    accountNumber: '987987',
    amount: 6000,
    charges: 10,
    transactionType: 'C2B',
    dateTime: '00/00/000 00:00 pm',
    status: 'COMPLETE'
  },
  // Add more dummy data as needed
];

const Transactions: React.FC = () => {
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('C2B');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const filteredData = dummyTransactions.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout>
    <div className="min-h-screen dark:bg-gray-900  md:px-6">
      <div className="mt-4 md:mt-6">
        <div className="rounded-lg bg-white px-6 py-4 shadow-md dark:bg-gray-dark dark:shadow-lg">
          <div className="flex justify-between items-center">
            <h4 className="mb-4 text-xl font-bold text-dark dark:text-white md:text-2xl">
              Transactions
            </h4>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button> */}
          </div>

          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium uppercase dark:text-white">Transaction Type:</label>
              <select
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
                className="ml-2 border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="C2B">C2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium uppercase dark:text-white">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ml-2 border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="Active">Complete</option>
                <option value="Inactive">Incomplete</option>
              </select>
            </div>
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded pl-8 pr-4 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Download className="h-4 w-4 text-gray-400 cursor-pointer" />
              <Filter className="h-4 w-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] md:min-w-[1000px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Transaction ID</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Account Number</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Amount</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Charges</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Transaction Type</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date/Time</th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((transaction, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{transaction.transactionId}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.accountNumber}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">Ksh {transaction.amount.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">Ksh {transaction.charges}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.transactionType}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.dateTime}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 text-sm ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default Transactions;