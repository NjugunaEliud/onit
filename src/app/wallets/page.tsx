"use client"
import DataStatsOne from "@/components/DataStats/DataStatsTwo";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState } from "react";

interface WalletTransaction {
  name: string;
  phone_number: string;
  transaction_code: string;
  dateTime: string;
  deposit: number;
  withdraw: number;
  charges: number;
  balance: number;
  wallet_id: string;
  status: string;
}

const dummyData: WalletTransaction[] = [
  {
    name: "JAMES P.",
    phone_number: "254722***123",
    transaction_code: "SIJ234KKNN",
    dateTime: "OCT 04 2024 20:43:01",
    deposit: 1000.00,
    withdraw: 0,
    charges: 28.00,
    balance: 4300.00,
    wallet_id: "OBM002722123",
    status: "COMPLETE"
  },
  {
    name: "PAUL R.",
    phone_number: "254716***368",
    transaction_code: "SIJ314JKLD",
    dateTime: "OCT 04 2024 20:30:21",
    deposit: 1000.00,
    withdraw: 0,
    charges: 28.00,
    balance: 3300.00,
    wallet_id: "OBM002716368",
    status: "COMPLETE"
  },
  {
    name: "ROBERT K.",
    phone_number: "254704***311",
    transaction_code: "SIJ214SDPS",
    dateTime: "OCT 04 2024 20:18:29",
    deposit: 0,
    withdraw: 500.00,
    charges: 13.00,
    balance: 2300.00,
    wallet_id: "OBM002704311",
    status: "COMPLETE"
  },
  {
    name: "JAMES P.",
    phone_number: "254722***123",
    transaction_code: "SIJ214JDDS",
    dateTime: "OCT 04 2024 20:12:02",
    deposit: 0,
    withdraw: 200.00,
    charges: 10.00,
    balance: 2800.00,
    wallet_id: "OBM002722123",
    status: "COMPLETE"
  },
  {
    name: "PAULA P.",
    phone_number: "254718***002",
    transaction_code: "SIJ214JDFS",
    dateTime: "OCT 04 2024 20:11:04",
    deposit: 2000.00,
    withdraw: 0,
    charges: 28.00,
    balance: 3000.00,
    wallet_id: "OBM002718002",
    status: "COMPLETE"
  },
  {
    name: "MARIA T.",
    phone_number: "254721***500",
    transaction_code: "SIJ214JODS",
    dateTime: "OCT 04 2024 20:10:03",
    deposit: 1000.00,
    withdraw: 0,
    charges: 28.00,
    balance: 1000.00,
    wallet_id: "OBM002721500",
    status: "COMPLETE"
  }
];

const WalletDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = dummyData.filter((item) =>
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
    <>
    <DefaultLayout>
    <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <DataStatsOne />
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
          Wallet Transactions
        </h4>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-3 sm:grid-cols-4 mb-4">
              <div className="px-2">
                <h5 className="text-md font-medium uppercase xsm:text-base">
                  Company Name: <span className="font-semibold">Organization Limited</span>
                </h5>
              </div>
              <div className="px-2 text-center">
                <h5 className="text-md font-medium uppercase xsm:text-base">
                  Account ID: <span className="font-semibold">OBM0002</span>
                </h5>
              </div>
              <div className="hidden sm:block px-2 text-center">
                <h5 className="text-md font-medium uppercase xsm:text-base">
                  Account Type: <span className="font-semibold">Wallet</span>
                </h5>
              </div>
            </div>

            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">NAME</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">PHONE</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">TRANSACTION CODE</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">DATE/TIME</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">DEPOSIT</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">WITHDRAW</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">CHARGES</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">BALANCE</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">WALLET ID</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-4 py-6 text-sm font-medium text-gray-900 dark:text-white">{item.name}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.phone_number}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.transaction_code}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.dateTime}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
                      {item.deposit > 0 ? `KSH ${item.deposit.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
                      {item.withdraw > 0 ? `KSH ${item.withdraw.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">KSH {item.charges.toFixed(2)}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">KSH {item.balance.toFixed(2)}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.wallet_id}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 ${currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
                } rounded`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </DefaultLayout>
    </>
  );
};

export default WalletDashboard;