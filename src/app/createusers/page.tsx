"use client";
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

interface Errors {
    company_id?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: string;
}

const CompanyUserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        company_id: '',
        email: '',
        password: '',
        phone: '',
        role: 'admin',
        is_active: true,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!formData.company_id.trim()) newErrors.company_id = 'Company ID is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
        if (!formData.role.trim()) newErrors.role = 'Role is required';

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
            const response = await axios.post('https://us-central1-onit-439704.cloudfunctions.net/company-users', formData);
            console.log("Response:", response);

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'User created successfully',
                    icon: 'success'
                });
                setFormData({
                    company_id: '',
                    email: '',
                    password: '',
                    phone: '',
                    role: 'admin',
                    is_active: true,
                });
            }
        } catch (error) {
            console.log("Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create user. Please try again.',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name as keyof Errors]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <DefaultLayout>
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Create Company User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="company_id" className="block text-sm font-medium text-gray-700">Company ID</label>
                        <input
                            type="text"
                            id="company_id"
                            name="company_id"
                            value={formData.company_id}
                            onChange={handleChange}
                            disabled={loading}
                            className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.company_id ? 'ring-2 ring-red-500' : ''}`}
                            placeholder="Enter company ID"
                        />
                        {errors.company_id && <p className="text-sm text-red-500">{errors.company_id}</p>}
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
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            className={`w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
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
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full p-2 rounded-md outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {loading ? 'Creating User...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CompanyUserForm;
