import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import api from "../lib/axios"
const DashboardPage = () => {
    const [response, setResponse] = useState(null);
    const [countResponses, setCountResponses] = useState(null)
    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await api.get('/responses');
                setResponse(res.data.responses);
                setCountResponses(res.data.pagination.totalItems);
            }
            catch (err) {
                console.log(err);
            }
        };

        fetchResponses();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">

            <Topbar />
            {/* Sidebar + Main */}
            <div className="flex">
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <section className="bg-white rounded-3xl border border-pink-200 p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-4">Welcome Back, Cutie Admin! 💕</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Here’s your dashboard filled with sparkly data and sweet summaries.
                        </p>

                        {/* Dummy stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Total Responses</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">{countResponses}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Female Participants</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">78</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Avg. Stress Level</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">High</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Top Coping Method</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">Music 🎵</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="mt-10 text-center text-sm text-pink-400">
                        <p>Made with 💖 and bubble tea by Hello Kitty's team</p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
