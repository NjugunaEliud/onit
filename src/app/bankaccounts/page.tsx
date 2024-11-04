"use client"
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DataStatsTwo from "@/components/DataStats/DataStatsTwo";
import React, { useState } from "react";

interface BankTransaction {
  name: string;
  account_number: string;
  transaction_code: string;
  dateTime: string;
  deposit: number;
  withdraw: number;
  charges: number;
  balance: number;
  bank_account_id: string;
  status: string;
}

const dummyData: BankTransaction[] = [
  {
    name: "JAMES P.",
    account_number: "903485093485093",
    transaction_code: "BANKTR234KKNN",
    dateTime: "OCT 04 2024 20:43:01",
    deposit: 10000.00,
    withdraw: 0,
    charges: 0.00,
    balance: 43000.00,
    bank_account_id: "ONIT002722123",
    status: "COMPLETED"
  },
  {
    name: "PAUL R.",
    account_number: "903485093485094",
    transaction_code: "BANKTR314JKLD",
    dateTime: "OCT 04 2024 20:30:21",
    deposit: 15000.00,
    withdraw: 0,
    charges: 0.00,
    balance: 33000.00,
    bank_account_id: "ONIT002716368",
    status: "COMPLETED"
  },
  {
    name: "ROBERT K.",
    account_number: "903485093485095",
    transaction_code: "BANKTR214SDPS",
    dateTime: "OCT 04 2024 20:18:29",
    deposit: 0,
    withdraw: 5000.00,
    charges: 0.00,
    balance: 23000.00,
    bank_account_id: "ONIT002704311",
    status: "COMPLETED"
  },
  {
    name: "JAMES P.",
    account_number: "903485093485093",
    transaction_code: "BANKTR214JDDS",
    dateTime: "OCT 04 2024 20:12:02",
    deposit: 0,
    withdraw: 2000.00,
    charges: 0.00,
    balance: 28000.00,
    bank_account_id: "ONIT002722123",
    status: "COMPLETED"
  },
  {
    name: "PAULA P.",
    account_number: "903485093485096",
    transaction_code: "BANKTR214JDFS",
    dateTime: "OCT 04 2024 20:11:04",
    deposit: 20000.00,
    withdraw: 0,
    charges: 0.00,
    balance: 30000.00,
    bank_account_id: "ONIT002718002",
    status: "COMPLETED"
  },
  {
    name: "MARIA T.",
    account_number: "903485093485097",
    transaction_code: "BANKTR214JODS",
    dateTime: "OCT 04 2024 20:10:03",
    deposit: 10000.00,
    withdraw: 0,
    charges: 0.00,
    balance: 10000.00,
    bank_account_id: "ONIT002721500",
    status: "COMPLETED"
  }
];

const BankDashboard: React.FC = () => {
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
      <DataStatsTwo />
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
          Bank Account Transactions
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
                  Bank: <span className="font-semibold">ONIT BANK</span>
                </h5>
              </div>
              <div className="hidden sm:block px-2 text-center">
                <h5 className="text-md font-medium uppercase xsm:text-base">
                  Account Type: <span className="font-semibold">Bank Account</span>
                </h5>
              </div>
            </div>

            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">NAME</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ACCOUNT NUMBER</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">TRANSACTION CODE</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">DATE/TIME</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">DEPOSIT</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">WITHDRAW</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">CHARGES</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">BALANCE</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">BANK ACCOUNT ID</th>
                  <th className="px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-4 py-6 text-sm font-medium text-gray-900 dark:text-white">{item.name}</td>
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.account_number}</td>
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
                    <td className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">{item.bank_account_id}</td>
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

export default BankDashboard;