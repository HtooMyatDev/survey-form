import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Star } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router"
import api from "../lib/axios.js"
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import { showSuccessToast, showErrorToast } from '../utils/toastHelpers';
import LoginDecorations from '../components/login/LoginDecorations';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            showSuccessToast('Welcome back, Admin! 🎀');
            navigate("/dashboard");
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden flex items-center justify-center p-4">
            <Toaster position="top-center" />
            <LoginDecorations />

            <div className="w-full max-w-2xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-block bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-pink-200 mb-4 shadow-sm">
                        <span className="text-pink-600 font-bold text-sm sm:text-base flex items-center gap-2">
                            <Heart size={16} className="fill-pink-500" />
                            Psychology Research Portal
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-pink-600 mb-4 tracking-tight">
                        Welcome, Friend! 🎀
                    </h1>
                    <p className="text-pink-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                        Your honest responses help us understand mental health awareness and build a more empathetic community.
                    </p>
                </div>

                {!isAdminMode ? (
                    /* Participant View (Default) */
                    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-2 border-pink-100 p-8 sm:p-12 text-center transform transition-all hover:scale-[1.01]">
                        <div className="mb-8">
                            <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <Star size={40} className="text-pink-500 fill-pink-500 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-pink-700 mb-2">Ready to contribute?</h2>
                            <p className="text-gray-500 text-sm">It only takes a few minutes, and your identity remains private.</p>
                        </div>

                        <Link
                            to="/survey"
                            className="btn btn-lg w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-none text-white font-bold rounded-2xl shadow-lg shadow-pink-200 h-16 text-lg group"
                        >
                            Start the Survey
                            <Heart size={20} className="transition-transform group-hover:scale-125" fill="white" />
                        </Link>

                        <div className="mt-10 pt-6 border-t border-pink-50">
                            <button 
                                onClick={() => setIsAdminMode(true)}
                                className="text-pink-400 hover:text-pink-600 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                                Admin Access
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Admin Login View */
                    <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-2 border-pink-200 p-8 sm:p-10 transform transition-all animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-pink-700">Admin Dashboard</h2>
                            <button 
                                onClick={() => setIsAdminMode(false)}
                                className="text-pink-400 hover:text-pink-500 text-sm font-bold"
                            >
                                Back to Survey
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="admin@survey.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-pink-600 font-semibold">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="input input-bordered w-full bg-pink-50 border-pink-100 focus:border-pink-300 rounded-2xl pr-12 text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                loading={isLoading}
                                disabled={isLoading}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 rounded-2xl h-14 font-bold border-none"
                            >
                                Sign In to Dashboard
                            </Button>
                        </form>
                    </div>
                )}

                {/* Trust Footer */}
                <div className="mt-8 text-center space-y-2 opacity-60">
                    <p className="text-xs text-pink-400 font-medium">
                        🛡️ 100% Secure & Private Research Tool
                    </p>
                    <p className="text-[10px] text-pink-300 uppercase tracking-widest">
                        Designed for Future Psychologists
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
