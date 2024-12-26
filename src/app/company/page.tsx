"use client";
import React, { useState, useEffect } from "react";
import { Copy, Key, Trash2, Calendar } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Link from "next/link";

interface ApiKey {
  company_id: string;
  consumer_key: string;
  consumer_secret: string;
  created_at: string;
  expires_at: string;
}

interface CompanyInfo {
  companyId: string;
  name: string;
  regNo: string;
  phone: string;
  email: string;
  address: string;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString.replace(" ", "T"));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
};

interface KeyDisplayProps {
  label: string;
  value?: string;
  onCopy: () => void;
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({ label, value, onCopy }) => {
  const maskKey = (key?: string) => {
    if (!key) return "N/A";
    return key.length > 16 ? `${key.slice(0, 8)}...${key.slice(-8)}` : key;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600">{label}</h3>
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-mono">{maskKey(value)}</p>
        <button 
          onClick={onCopy} 
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
          disabled={!value}
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"companyInfo" | "apiKeys">("companyInfo");
  const [apps, setApps] = useState<ApiKey[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const companyId = window.localStorage.getItem("companyId");
    if (!companyId) {
      setError("No company ID found. Please ensure you're properly logged in.");
      return;
    }

    const fetchApps = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ payload: ApiKey[] }>(
          `https://us-central1-onit-439704.cloudfunctions.net/api_keys?company_id=${companyId}`
        );
        if (response.data && Array.isArray(response.data.payload)) {
          setApps(response.data.payload);
        } else {
          setError("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching apps:", error);
        setError("Failed to fetch API keys");
        setApps([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get<{ payload: CompanyInfo }>(
          `https://us-central1-onit-439704.cloudfunctions.net/company?company_id=${companyId}`
        );
        if (response.data && response.data.payload) {
          setCompanyInfo(response.data.payload);
        } else {
          setError("Invalid company info response format");
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
        setError("Failed to fetch company information");
      }
    };

    fetchApps();
    fetchCompanyInfo();
  }, []);

  const handleAddApp = async () => {
    const companyId = window.localStorage.getItem("companyId");
    if (!companyId) {
      showToast("error", "No company ID found");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<ApiKey>(
        "https://us-central1-onit-439704.cloudfunctions.net/api_keys",
        { company_id: companyId }
      );
      setApps(prevApps => [...prevApps, response.data]);
      showToast("success", "API Keys Generated Successfully!");
    } catch (error) {
      console.error("Error creating new app:", error);
      showToast("error", "Failed to generate API keys");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApp = async (companyId: string) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `https://us-central1-onit-439704.cloudfunctions.net/api_keys?company_id=${companyId}`
        );
        setApps(prevApps => prevApps.filter(app => app.company_id !== companyId));
        showToast("success", "API Key deleted successfully");
      } catch (error) {
        console.error("Error deleting app:", error);
        showToast("error", "Failed to delete API key");
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) {
      showToast("error", "No value to copy");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => showToast("success", `${label} copied to clipboard!`))
      .catch(() => showToast("error", "Failed to copy to clipboard"));
  };

  const showToast = (type: "success" | "error", message: string) => {
    Swal.fire({
      icon: type,
      title: message,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // if (error) {
  //   return (
  //     <DefaultLayout>
  //       <div className="text-center p-6">
  //         <p className="text-red-600">{error}</p>
  //         <Link href="/createcompany" className="mt-4 inline-block bg-blue-500 px-4 py-2 text-white rounded-md">
  //           Create Company
  //         </Link>
  //       </div>
  //     </DefaultLayout>
  //   );
  // }

  return (
    <DefaultLayout>
      <div className="mb-6">
        {/* <Link href="/createcompany" className="bg-blue-500 px-4 py-2 text-white rounded-md">
          Create Company
        </Link> */}
      </div>

      <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "companyInfo" 
                ? "border-b-2 border-blue-500 text-blue-600" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("companyInfo")}
          >
            Company Info
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "apiKeys" 
                ? "border-b-2 border-blue-500 text-blue-600" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("apiKeys")}
          >
            API Keys
          </button>
        </div>

        {activeTab === "companyInfo" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            {companyInfo ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Name</h3>
                  <p className="text-lg">{companyInfo.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Registration No.</h3>
                  <p className="text-lg">{companyInfo.regNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Phone</h3>
                  <p className="text-lg">{companyInfo.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Email</h3>
                  <p className="text-lg">{companyInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Address</h3>
                  <p className="text-lg">{companyInfo.address}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}

        {activeTab === "apiKeys" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">API Keys</h2>
              <button
                onClick={handleAddApp}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <Key className="w-4 h-4" />
                {loading ? "Generating..." : "Generate New API Keys"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {apps.map((app) => (
                <div key={app.company_id} className="border-2 rounded-lg p-6 bg-white">
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Key className="w-5 h-5" />
                          API Key
                        </h3>
                      </div>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                      <button
                        onClick={() => handleDeleteApp(app.company_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <KeyDisplay
                      label="Consumer Key"
                      value={app.consumer_key}
                      onCopy={() => copyToClipboard(app.consumer_key, "Consumer Key")}
                    />
                    <KeyDisplay
                      label="Consumer Secret"
                      value={app.consumer_secret}
                      onCopy={() => copyToClipboard(app.consumer_secret, "Consumer Secret")}
                    />

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {app.created_at}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Expires: {app.expires_at}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {apps.length === 0 && !loading && (
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <Key className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="mt-4 text-gray-500">No API keys found.</p>
                </div>
              )}

              {loading && (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;