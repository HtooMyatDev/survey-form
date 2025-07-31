import React from 'react'
import { useNavigate } from "react-router"
import { LogOut } from "lucide-react";
import { useState } from "react"
const Topbar = () => {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const handleLogout = () => {
        setLoading(true)
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div>
            {/* Header */}
            <header className="bg-pink-200 shadow-md py-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">🎀 Admin Dashboard</h1>
                <button className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 cursor-pointer" onClick={handleLogout}
                    disabled={isLoading}>

                    {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                            <LogOut size={16} />
                            Logout
                        </>
                    )}

                </button>
            </header>
        </div>
    )
}

export default Topbar
