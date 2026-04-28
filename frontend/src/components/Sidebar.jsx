import React from 'react';
import { User, PieChart, FileText, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router";

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { to: "/list", label: "Surveys", icon: PieChart },
        { to: "/questions", label: "Questions", icon: FileText }
    ];

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, label, icon: Icon }) => (
        <Link
            to={to}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(to)
                    ? 'bg-pink-300 text-white shadow-md'
                    : 'text-pink-700 hover:bg-pink-100'
            }`}
        >
            <Icon size={20} />
            <span className="font-semibold">{label}</span>
        </Link>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 md:hidden z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 md:static w-64 h-screen md:h-auto md:min-h-full bg-gradient-to-b from-pink-100 via-pink-50 to-white
                    p-6 border-r border-pink-200 shadow-lg md:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    z-50 md:z-0 shrink-0
                `}
            >
                <nav className="space-y-2">
                    <div className="mb-6 hidden md:block">
                        <h2 className="text-pink-700 font-bold text-lg">Menu</h2>
                        <div className="w-12 h-1 bg-pink-300 rounded-full mt-2"></div>
                    </div>

                    {menuItems.map((item) => (
                        <NavLink key={item.to} {...item} />
                    ))}
                </nav>

                {/* Footer Info */}
                <div className="absolute bottom-6 left-6 right-6 hidden md:block">
                    <div className="bg-pink-100 rounded-xl p-4 border border-pink-200">
                        <p className="text-sm text-pink-700">
                            <span className="font-semibold">Tip:</span> Manage surveys and track responses easily!
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
