import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import api from "../lib/axios";
import { Heart } from "lucide-react";
import { calculateDashboardStats } from "../utils/dashboardUtils";
import AnalyticsCharts from "../components/AnalyticsCharts";

const Dashboard = () => {
    const [stats, setStats] = useState({
        countResponses: 0,
        maleCount: 0,
        topCoping: "N/A",
        q8TopAnswer: "N/A",
        q8Counts: {}
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [qRes, rRes] = await Promise.all([
                    api.get('/questions'),
                    api.get('/responses?limit=1000')
                ]);

                const questions = qRes.data;
                const responses = rRes.data.responses;
                const totalItems = rRes.data.pagination.totalItems;

                const calculated = calculateDashboardStats(questions, responses);
                
                setStats({
                    countResponses: totalItems,
                    ...calculated
                });
            } catch (err) {
                console.error("Dashboard data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, colorClass = "text-pink-600" }) => (
        <div className="bg-pink-50 p-3 sm:p-4 rounded-2xl shadow-sm border border-pink-200 min-w-0">
            <h3 className="text-sm sm:text-lg font-semibold">{title}</h3>
            <p className={`text-xl sm:text-3xl font-bold mt-2 truncate ${colorClass}`} title={String(value)}>
                {value}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 p-3 sm:p-6 min-w-0">
                    <section className="bg-white rounded-3xl border border-pink-200 p-4 sm:p-6 shadow-md">
                        <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                            Welcome Back, Cutie Admin! <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Here's your dashboard filled with sparkly data and sweet summaries.
                        </p>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                                <StatCard title="Total Responses" value={stats.totalResponses} />
                                <StatCard title="Male" value={stats.demographics.male} colorClass="text-blue-600" />
                                <StatCard title="Female" value={stats.demographics.female} colorClass="text-pink-600" />
                                <StatCard title="Others" value={stats.demographics.other} colorClass="text-purple-600" />
                            </div>
                        )}

                        {!loading && <AnalyticsCharts stats={stats} />}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
