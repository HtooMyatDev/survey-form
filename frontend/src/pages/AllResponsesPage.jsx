import React, { useEffect, useState } from "react";
import { Eye, Filter, Search } from "lucide-react";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"
import toast from "react-hot-toast"
import SurveysNotFound from "../components/SurveysNotFound"
import { Link } from "react-router-dom";
const AllResponsesPage = () => {

    const [responses, setResponses] = useState([])
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ageFilter, setAgeFilter] = useState("");
    const [occupationFilter, setOccupationFilter] = useState("");
    // Remove allAges and allOccupations state and related useEffect

    const fetchResponses = async (filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams(filters).toString();
            const url = params ? `/responses?${params}` : "/responses";
            const res = await api.get(url);
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

    useEffect(() => {
        fetchResponses();
    }, []);

    const handleFilter = () => {
        const filters = {};
        if (ageFilter) filters.age = ageFilter;
        if (occupationFilter) filters.occupation = occupationFilter;
        fetchResponses(filters);
    };

    const handleReset = () => {
        setAgeFilter("");
        setOccupationFilter("");
        fetchResponses();
    };
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
                    <h1 className="text-3xl font-bold mb-4">🎀 All Survey Responses</h1>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search responses..."
                                className="p-2 border border-pink-200 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            // (Optional: implement search logic)
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <input
                                type="text"
                                value={ageFilter}
                                onChange={e => setAgeFilter(e.target.value)}
                                placeholder="Filter by Age"
                                className="p-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 w-32"
                            />
                            <input
                                type="text"
                                value={occupationFilter}
                                onChange={e => setOccupationFilter(e.target.value)}
                                placeholder="Filter by Occupation"
                                className="p-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 w-48"
                            />
                            <button
                                className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500"
                                onClick={handleFilter}
                                type="button"
                            >
                                <Filter size={18} />
                                Filter
                            </button>
                            <button
                                className="flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full hover:bg-pink-200 border border-pink-200"
                                onClick={handleReset}
                                type="button"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    {responses.length === 0 && !loading && (
                        <SurveysNotFound />
                    )}

                    {/* Table */}
                    {responses.length > 0 && !isRateLimited && (
                        <div>
                            <div className="overflow-x-auto bg-white rounded-3xl shadow-md border border-pink-200">

                                <table className="min-w-full table-auto text-left">
                                    <thead className="bg-pink-200 text-pink-800 text-sm">
                                        <tr>
                                            <th className="px-6 py-3">Age</th>
                                            <th className="px-6 py-3">Gender</th>
                                            <th className="px-6 py-3">Occupation</th>
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
                                                <td className="px-6 py-4">
                                                    <Link to={`/details/${res._id}`} className="text-pink-600 hover:text-pink-800 flex items-center gap-1">
                                                        <Eye size={16} /> View
                                                    </Link>
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
