import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Star, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router"
import api from "../lib/axios.js"

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login process
        try {
            const response = await api.post("/auth/login", formData)
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard")
        }
        catch (error) {
            console.log(error)
        }

        setTimeout(() => {
            if (formData.email && formData.password) {
                toast.success('Welcome back, cutie! 🎀', {
                    duration: 4000,
                    style: {
                        background: '#FFB6C1',
                        color: '#FF1493',
                        border: '2px solid #FF69B4',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }
                });
            } else {
                toast.error('Please fill in all fields, sweetie! 💕', {
                    duration: 4000,
                    style: {
                        background: '#FFE4E1',
                        color: '#DC143C',
                        border: '2px solid #FF69B4',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }
                });
            }
            setLoading(false);
        }, 1500);


    };

    const FloatingElement = ({ children, className, delay = "0s" }) => (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: delay
            }}
        >
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Floating decorative elements */}
            <FloatingElement className="top-10 left-10 text-pink-300" delay="0s">
                <Heart size={24} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-20 right-20 text-pink-400" delay="1s">
                <Star size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-40 left-1/4 text-pink-200" delay="2s">
                <Sparkles size={18} />
            </FloatingElement>
            <FloatingElement className="bottom-20 right-10 text-pink-300" delay="0.5s">
                <Heart size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-40 left-20 text-pink-400" delay="1.5s">
                <Star size={22} fill="currentColor" />
            </FloatingElement>

            {/* Main login container */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    {/* Hello Kitty inspired header */}
                    <div className="text-center mb-8">
                        <div className="inline-block relative">
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-pink-300 mx-auto mb-4 flex items-center justify-center shadow-lg">
                                <div className="relative">
                                    {/* Hello Kitty face */}
                                    <div className="w-16 h-12 bg-pink-100 rounded-full relative">
                                        {/* Eyes */}
                                        <div className="absolute top-3 left-2 w-2 h-2 bg-black rounded-full"></div>
                                        <div className="absolute top-3 right-2 w-2 h-2 bg-black rounded-full"></div>
                                        {/* Nose */}
                                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>
                                        {/* Bow */}
                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-pink-400 rounded-full">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-pink-600 mb-2">Hello Cutie!</h1>
                            <p className="text-pink-400 text-sm">Welcome back to your kawaii world 🎀</p>
                        </div>
                    </div>

                    {/* Login form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-8">
                        <div className="space-y-6">
                            {/* Email field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-pink-600 font-semibold">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@kawaii.com"
                                    className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 rounded-2xl text-gray-800 placeholder-pink-400"
                                    required
                                />
                            </div>

                            {/* Password field */}
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
                                        className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 rounded-2xl pr-12 text-gray-800 placeholder-pink-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me and forgot password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                    <span className="text-pink-600">Remember me</span>
                                </label>
                                <a href="#" className="text-pink-500 hover:text-pink-700 hover:underline transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className="btn w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-none text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <>
                                        Sign In
                                        <Heart size={16} className="ml-2" fill="currentColor" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="divider text-pink-300">or</div>

                            {/* Continue as guest button */}
                            <Link
                                type="button"
                                to={"/survey"}
                                className="btn btn-outline w-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-2xl"
                            >
                                <Star size={16} className="mr-2" />
                                Continue as Guest
                            </Link>

                            {/* Sign up link */}
                            <div className="text-center text-sm text-pink-500">
                                Please continue as guest to answer the survey{' '}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 text-xs text-pink-400">
                        Made with 💕 for all the kawaii lovers
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div >
    );
};

export default LoginPage;
