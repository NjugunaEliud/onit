"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
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

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Time period buttons - Stack on mobile, row on desktop */}
            <div className="flex flex-wrap bg-white rounded-lg shadow-sm w-full sm:w-auto">
              {periods.map((period, index) => (
                <button
                  key={index}
                  className={`px-2 sm:px-4 py-2 text-sm flex-1 sm:flex-none whitespace-nowrap
                    first:rounded-l-lg last:rounded-r-lg
                    ${period === '24 hrs' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
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
          {/* Primary Bank Account Card */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Primary Bank Account</h2>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Onit Bank</h3>
              <p className="text-xl sm:text-2xl font-bold my-2">Ksh 40,000</p>
              <p className="text-gray-600 text-sm sm:text-base break-all">903485093485093</p>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Wallet</h2>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Virtual account</h3>
              <p className="text-xl sm:text-2xl font-bold my-2">Ksh 80,000</p>
              <p className="text-gray-600 text-sm sm:text-base">Account ID: 00001</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Graph Section */}
          <div className="lg:col-span-2 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Primary Bank Account</h2>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="primary" fill="#E5E7EB" />
                  <Bar dataKey="secondary" fill="#9CA3AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm font-medium">{transaction.type}</p>
                    <p className="text-xs text-gray-500">{transaction.dateTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">{transaction.amount}</p>
                    <p className="text-xs text-gray-500 break-all">{transaction.accountNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;