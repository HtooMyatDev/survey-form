import React from 'react'
import { User, PieChart, Settings } from "lucide-react";
import { Link } from "react-router"
const Sidebar = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <aside aside className="w-64 bg-pink-100 p-6 border-r border-pink-200 hidden md:block" >
                <nav className="space-y-4">
                    <Link className="flex items-center gap-3 font-semibold hover:text-pink-500 cursor-pointer" to={"/dashboard"}>
                        <User size={18} />
                        Dashboard
                    </Link>
                    <Link className="flex items-center gap-3 font-semibold hover:text-pink-500 cursor-pointer" to={"/list"}>
                        <PieChart size={18} />
                        Surveys
                    </Link>
                    <div className="flex items-center gap-3 font-semibold hover:text-pink-500 cursor-pointer">
                        <Settings size={18} />
                        Settings
                    </div>
                </nav>
            </aside >
        </div>
    )
}

export default Sidebar
