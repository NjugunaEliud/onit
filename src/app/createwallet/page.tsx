"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CreateWalletPage() {
  const [userId, setUserId] = useState("");
  const [bankId, setBankId] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch userId from local storage
    const storedUserId = window.localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("Failed to fetch user ID");
      Swal.fire({
        icon: "error",
        title: "User ID Not Found",
        text: "Please log in again.",
      });
    }
  }, []);

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!userId.trim() || !bankId.trim() || !name.trim() || !phoneNo.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out all fields.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://us-central1-onit-439704.cloudfunctions.net/wallet`,
        {
          userId,
          bankId,
          name,
          isActive: "Y",
          phoneNo
        }
      );

      if (response.data.code === 201) {
        console.log("Response Create Wallet", response.data);
        Swal.fire({
          icon: "success",
          title: "Wallet Created",
          text: "The wallet has been successfully created.",
        });
        router.push('/wallets')
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create wallet. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-background flex items-center justify-center">
        <div className="w-full ms-24 me-24 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-center mb-6">
            Create Wallet
          </h1>
          <form onSubmit={handleCreateWallet} className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="userId" className="text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                className="p-2 bg-gray-200 rounded"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bankId" className="text-sm font-medium text-gray-700">
                Bank ID
              </label>
              <input
                type="text"
                id="bankId"
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
                placeholder="Enter Bank ID"
                className="p-2 bg-gray-200 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Wallet Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter wallet name"
                className="p-2 bg-gray-200 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter phone number"
                className="p-2 bg-gray-200 rounded mb-4"
              />
            </div>
            <button
              type="submit"
              className={`mt-6 w-full px-4 py-2 text-white rounded ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              {loading ? "Creating Wallet..." : "Create Wallet"}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}