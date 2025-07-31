import React, { useEffect, useState } from "react";
import { Eye, Filter, Search } from "lucide-react";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"
import toast from "react-hot-toast"
import SurveysNotFound from "../components/SurveysNotFound"
const AllResponsesPage = () => {

    const [responses, setResponses] = useState([])
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await api.get("/responses");
                console.log(res.data);
                setResponses(res.data);
                setIsRateLimited(false);
            } catch (error) {
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Error fetching notes");
                }
            } finally {
                setLoading(false);
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
                <div className="max-w-7xl mx-auto flex-1 p-6">
                    {loading && (
                        <div className="flex text-center justify-center items-center min-h-screen">
                            <span className="loading loading-spinner loading-sm"></span>
                            💌 Loading Surveys...
                        </div>
                    )}
                    {responses.length === 0 && !loading && (
                        <SurveysNotFound />
                    )}

                    {/* Table */}
                    {responses.length > 0 && !isRateLimited && (
                        <div>
                            <h1 className="text-3xl font-bold mb-4">🎀 All Survey Responses</h1>

                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Search size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search responses..."
                                        className="p-2 border border-pink-200 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                    />
                                </div>
                                <button className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500">
                                    <Filter size={18} />
                                    Filter
                                </button>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-3xl shadow-md border border-pink-200">

                                <table className="min-w-full table-auto text-left">
                                    <thead className="bg-pink-200 text-pink-800 text-sm">
                                        <tr>
                                            <th className="px-6 py-3">Age</th>
                                            <th className="px-6 py-3">Gender</th>
                                            <th className="px-6 py-3">Occupation</th>
                                            <th className="px-6 py-3">Mental Health Barrier</th>
                                            <th className="px-6 py-3">Coping</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {responses.map((res) => (
                                            <tr
                                                key={res._id}
                                                className="border-t border-pink-100 hover:bg-pink-50 transition"
                                            >
                                                <td className="px-6 py-4">{res.age}</td>
                                                <td className="px-6 py-4 capitalize">{res.gender}</td>
                                                <td className="px-6 py-4">{res.occupation}</td>
                                                <td className="px-6 py-4 capitalize">{res.barrier_to_mental_health_support}</td>
                                                <td className="px-6 py-4">
                                                    {res.coping_mechanisms.join(", ")}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-pink-600 hover:text-pink-800 flex items-center gap-1">
                                                        <Eye size={16} /> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AllResponsesPage;
