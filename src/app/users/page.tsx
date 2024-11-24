"use client";
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Link from 'next/link';
import axios from 'axios';

interface User {
  id: string;
  lastName: string;
  email: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  status: string;
}

const Users: React.FC = () => {
  const [accountTypeFilter, setAccountTypeFilter] = useState('Wallet');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const company_id = window.localStorage.getItem("companyId");

    if (company_id) {
      axios.get(`https://us-central1-onit-439704.cloudfunctions.net/company-users?company_id=${company_id}`)
        .then((response) => {
          console.log("Response", response.data.payload);
          setUsers(response.data.payload);
        })
        .catch((error) => {
          console.error("Error fetching company users:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("No company ID found in localStorage.");
      setLoading(false);
    }
  }, []);

  const filteredData = users?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Loader Spinner */}
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="ml-6 flex space-x-1">
          <span className="inline-block animate-wave">P</span>
          <span className="inline-block animate-wave delay-[100ms]">l</span>
          <span className="inline-block animate-wave delay-[200ms]">e</span>
          <span className="inline-block animate-wave delay-[300ms]">a</span>
          <span className="inline-block animate-wave delay-[400ms]">s</span>
          <span className="inline-block animate-wave delay-[500ms]">e</span>
          <span className="inline-block animate-wave delay-[600ms]"> </span>
          <span className="inline-block animate-wave delay-[700ms]">w</span>
          <span className="inline-block animate-wave delay-[800ms]">a</span>
          <span className="inline-block animate-wave delay-[900ms]">i</span>
          <span className="inline-block animate-wave delay-[1000ms]">t</span>
          <span className="inline-block animate-wave delay-[1100ms]"> </span>
          <span className="inline-block animate-wave delay-[1200ms]">f</span>
          <span className="inline-block animate-wave delay-[1300ms]">o</span>
          <span className="inline-block animate-wave delay-[1400ms]">r</span>
          <span className="inline-block animate-wave delay-[1500ms]"> </span>
          <span className="inline-block animate-wave delay-[1600ms]">w</span>
          <span className="inline-block animate-wave delay-[1700ms]">h</span>
          <span className="inline-block animate-wave delay-[1800ms]">i</span>
          <span className="inline-block animate-wave delay-[1900ms]">l</span>
          <span className="inline-block animate-wave delay-[2000ms]">e</span>
          <span className="inline-block animate-wave delay-[2100ms]">...</span>
        </p>

      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen dark:bg-gray-900 px-4 md:px-6">
        <Link className="px-4 py-2 text-sm border rounded-md text-white bg-blue-500" href="/createusers"> Add Users</Link>

        <div className="mt-4 md:mt-6">
          <div className="rounded-lg bg-white px-6 py-4 shadow-md dark:bg-gray-dark dark:shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-dark dark:text-white md:text-2xl">
              Users
            </h4>

            {/* Filters */}
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="flex items-center">
                <label className="text-sm font-medium uppercase dark:text-white">Account Type:</label>
                <select
                  value={accountTypeFilter}
                  onChange={(e) => setAccountTypeFilter(e.target.value)}
                  className="ml-2 border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="Wallet">Wallet</option>
                  <option value="Company">Company</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm font-medium uppercase dark:text-white">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="ml-2 border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded pl-8 pr-4 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] md:min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User ID</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Phone</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Email</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Contact</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Account Number</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Account Type</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>{user.phone}</div>
                        {/* <div>{user.phone}</div> */}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>{user.email}</div>
                        {/* <div>{user.phone}</div> */}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.accountNumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.accountType}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.status}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.status}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.status}</td>
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
                  className={`mx-1 px-3 py-1 text-sm ${currentPage === index + 1
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

export default Users;
