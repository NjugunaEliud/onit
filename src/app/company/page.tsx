"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

// Define the interface for app data
interface ApiKey {
  id: string;
  company_id: string;
  key: string;
  is_active: boolean;
  created_at: string;
  expires_at: string;
}

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState('Company Details');
  const [apps, setApps] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const companyId = '1srNPims4qAy2nFuivwN';
        const response = await axios.get(`https://us-central1-onit-439704.cloudfunctions.net/api_keys?company_id=${companyId}`);
        setApps(response.data.payload);
      } catch (error) {
        console.error("Error fetching apps:", error);
        setApps([]);
      }
    };

    fetchApps();
  }, []);

  const handleAddApp = async () => {
    setLoading(true);
    try {
      const companyId = '1srNPims4qAy2nFuivwN';
      const response = await axios.post<ApiKey>('https://us-central1-onit-439704.cloudfunctions.net/api_keys', {
        company_id: companyId,
        name: 'New App',
      });

      setApps([...apps, response.data]);
      console.log("Response Api Key", response.data);
    } catch (error) {
      console.error("Error creating new app:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApp = async (appId: string) => {
    try {
      await axios.delete(`https://us-central1-onit-439704.cloudfunctions.net/api_keys?id=${appId}`);
      setApps(apps.filter(app => app.id !== appId));
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Helper function to display the masked key
  const maskKey = (key: string | undefined) => key ? `${key.slice(0, 4)}${'*'.repeat(10)}` : '';


  return (
    <DefaultLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Company</h1>
          </div>

          <nav className="flex border-b border-gray-300 mb-4">
            <button
              onClick={() => setActiveTab('Company Details')}
              className={`px-4 py-2 font-semibold ${activeTab === 'Company Details' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
            >
              Company Details
            </button>
            <button
              onClick={() => setActiveTab('API')}
              className={`px-4 py-2 font-semibold ${activeTab === 'API' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
            >
              API
            </button>
          </nav>

          {activeTab === 'Company Details' && (
            <form className="p-4 border border-gray-300 rounded">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <label htmlFor="businessTitle" className="md:w-48 font-semibold text-gray-700 mb-2 md:mb-0">
                  Your Business Title
                </label>
                <input
                  type="text"
                  id="businessTitle"
                  name="businessTitle"
                  className="flex-1 p-2 bg-gray-200 border-none rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-start">
                <label htmlFor="businessAddress" className="md:w-48 font-semibold text-gray-700 mb-2 md:mb-0">
                  Your Business Address
                </label>
                <textarea
                  id="businessAddress"
                  name="businessAddress"
                  rows={4}
                  className="flex-1 p-2 border-none bg-gray-200 rounded focus:outline-none resize-none"
                ></textarea>
              </div>
            </form>
          )}

          {activeTab === 'API' && (
            <div className="border border-gray-300 rounded-lg p-6">
              <div className="mb-6">
                <button
                  onClick={handleAddApp}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.length > 0 ? (
                  apps.map((app) => (
                    <div key={app.id} className="border border-gray-300 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">API Key</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-700">Key</span>
                          <div className="p-2 bg-gray-100 rounded text-sm flex justify-between items-center">
                            {maskKey(app.key)}
                            <button onClick={() => copyToClipboard(app.key)} className="ml-2 text-blue-500">Copy</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                          Reset
                        </button>
                        <button
                          className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                          onClick={() => handleDeleteApp(app.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">No key available</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
