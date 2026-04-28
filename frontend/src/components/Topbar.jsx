import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { LogOut, Menu, X } from "lucide-react";
import Button from './common/Button';

const Topbar = ({ onMenuToggle }) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            localStorage.removeItem("token");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="bg-gradient-to-r from-pink-200 via-pink-150 to-pink-100 shadow-lg py-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuToggle}
                    className="md:hidden text-pink-600 hover:text-pink-700 transition"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">🎀 Survey Admin</h1>
                    <p className="text-xs sm:text-sm text-pink-600">Manage your psychology survey</p>
                </div>
            </div>



            <Button
                onClick={() => document.getElementById('logout_confirmation_modal').showModal()}
                loading={isLoading}
                size="md"
                className="gap-2"
            >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
            </Button>

            <dialog id="logout_confirmation_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-white border-2 border-pink-200 rounded-3xl shadow-2xl p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-4">😿</div>
                        <h3 className="font-bold text-xl text-pink-700">Leaving so soon?</h3>
                        <p className="py-2 text-gray-600">Are you sure you want to logout? We'll miss you! 💕</p>
                    </div>
                    <div className="modal-action flex w-full justify-center">
                        <form method="dialog" className="flex gap-3 w-full sm:w-auto">
                            <Button variant="secondary" className="flex-1 sm:flex-none">Cancel</Button>
                            <Button onClick={handleLogout} variant="primary" className="flex-1 sm:flex-none">Confirm Logout</Button>
                        </form>
                    </div>
                </div>
            </dialog>
        </header>
    );
};

export default Topbar;
