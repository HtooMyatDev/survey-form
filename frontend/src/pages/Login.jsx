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
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
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
            showSuccessToast('Welcome back! 🎀');
            navigate("/dashboard");
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <Toaster position="top-center" />
            <LoginDecorations />

            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">Hello Cutie! 🎀</h1>
                        <p className="text-pink-500 text-sm sm:text-base">Welcome to your psychology survey dashboard</p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-pink-200 p-6 sm:p-8"
                    >
                        <div className="space-y-5">
                            <FormInput
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                required
                            />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-pink-600 font-semibold">
                                        Password <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 rounded-2xl pr-12 text-gray-800 placeholder-pink-400 ${
                                            errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                            </div>

                            <Button
                                onClick={handleSubmit}
                                loading={isLoading}
                                disabled={isLoading}
                                size="lg"
                                className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white mt-6"
                            >
                                <Heart size={18} fill="currentColor" />
                                Sign In
                            </Button>

                            <div className="divider text-pink-300 my-4">or</div>

                            <Link
                                to="/survey"
                                className="block w-full bg-pink-50 text-pink-600 font-semibold py-3 rounded-2xl border-2 border-pink-200 hover:bg-pink-100 hover:border-pink-300 transition-all duration-300 text-center"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Star size={18} />
                                    Continue as Guest
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
