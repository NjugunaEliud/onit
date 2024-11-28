"use client";

import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Swal from "sweetalert2";

export default function CreateVirtualBankAccountPage() {
  const [bankId, setBankId] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateBankAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bankId.trim() || !type.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out both fields.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://us-central1-onit-439704.cloudfunctions.net/accounts`,
        {
          bankId,
          type,
        }
      );

      if (response.data.code == 201) {
        console.log("Response",response.data)
        Swal.fire({
          icon: "success",
          title: "Virtual Bank Account Created",
          text: "The bank account has been successfully created.",
        });
        // setName("");
        // setCode("");
      }
    } catch (error) {
      console.error("Error creating bank account:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create bank account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className=" bg-background flex items-center justify-center">
        <div className="w-full ms-24 me-24 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-center mb-6">
            Create Bank Account (Virtual)
          </h1>
          <form onSubmit={handleCreateBankAccount} className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Bank ID
              </label>
              <input
                type="text"
                id="name"
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
                placeholder="Enter bank id"
                className="p-2  bg-gray-200 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="code" className="text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                id="code"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter Type"
                className="p-2 bg-gray-200 rounded mb-4"
              />
            </div>
            <button
              type="submit"
              className={`mt-6 w-full px-4 py-2 text-white rounded ${
                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Creating  A Wallet ..." : "Create A Wallet Account"}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
