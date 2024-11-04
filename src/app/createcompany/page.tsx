"use client"
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

interface Errors {
  name?: string;
  regNo?: string;
  phone?: string;
  email?: string;
  address?: string;
}

const CompanyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    phone: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.regNo.trim()) newErrors.regNo = 'Registration number is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please check all required fields',
        icon: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://us-central1-onit-439704.cloudfunctions.net/company', formData);
      console.log("Response:", response);
      
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Company created successfully',
          icon: 'success'
        });
      }
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create company. Please try again.',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof Errors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create Company</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Enter company name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.regNo ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Enter registration number"
            />
            {errors.regNo && <p className="text-sm text-red-500">{errors.regNo}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.address ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Enter address"
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {loading ? 'Creating Company...' : 'Create Company'}
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CompanyForm;
