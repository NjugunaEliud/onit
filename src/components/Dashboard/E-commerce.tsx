"use client";
import React,{useState,useEffect} from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import Image from "next/image";
import axios from "axios";
interface PaymentRequest {
  MerchantRequestID: string;
  amount: number;
  phone_number: string;
  status:'string';
}


const ECommerce: React.FC = () => {
  const [admintransactions,setAdmintransactions] = useState<PaymentRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(()=>{
  async function getAdminTransactions(){
   const  response =  await axios.get('https://us-central1-go-green-436010.cloudfunctions.net/admin_get_transactions_with_status_complete');
   setAdmintransactions(response.data.data);
  }
  getAdminTransactions();
 },[])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredBrands = admintransactions.filter((brand) =>
    brand.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
   brand.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
   brand.status.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
   brand.MerchantRequestID.toString().toLowerCase().includes(searchTerm.toLowerCase()) 

  );

  const currentBrands = filteredBrands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <DataStatsOne />
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        All Entries
      </h4>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-5 w-96 p-2 border border-stroke rounded"
      />

      <div className="overflow-x-auto">
        <div className="min-w-[600px]"> 
          <div className="grid grid-cols-3 sm:grid-cols-4">
            <div className="px-2 pb-3.5">
              <h5 className="text-md font-medium uppercase xsm:text-base">
                Phone Number
              </h5>
            </div>
            <div className="px-2 pb-3.5 text-center">
              <h5 className="text-md font-medium uppercase xsm:text-base">
              Merchant Request ID
              </h5>
            </div>
            <div className="px-2 pb-3.5 text-center">
              <h5 className="text-md font-medium uppercase xsm:text-base">
                Amount
              </h5>
            </div>
            <div className="hidden sm:block px-2 pb-3.5 text-center">
              <h5 className="text-md font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
          </div>

          {currentBrands.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === currentBrands.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-dark-3"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3.5 px-2 py-4">
                
                <p className="hidden sm:block text-md  text-dark dark:text-white">
                  {brand.phone_number}
                </p>
              </div>

              <div className="flex items-center justify-center px-2 py-4">
                <p className="text-md text-dark dark:text-white">
                  {brand.MerchantRequestID}
                </p>
              </div>

              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-green-light-1">
                  KSH{brand.amount}
                </p>
              </div>

              <div className="hidden sm:flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {brand.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 ${
              currentPage === index + 1
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
    </>
  );
};

export default ECommerce;
