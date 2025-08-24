import React, { useEffect, useState } from "react";
import { Eye, Filter, Search, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"
import toast from "react-hot-toast"
import SurveysNotFound from "../components/SurveysNotFound"
import { Link } from "react-router-dom";
const AllResponsesPage = () => {

    const [responses, setResponses] = useState([])
    const [questions, setQuestions] = useState([])
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ageFilter, setAgeFilter] = useState("");
    const [occupationFilter, setOccupationFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false
    });
    // Remove allAges and allOccupations state and related useEffect

    const fetchResponses = async (filters = {}, page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                ...filters,
                page: page.toString(),
                limit: "10"
            }).toString();
            const url = `/responses?${params}`;
            const res = await api.get(url);
            setResponses(res.data.responses);
            setPagination(res.data.pagination);
            setIsRateLimited(false);
        } catch (error) {
            if (error.response?.status === 429) {
                setIsRateLimited(true);
            } else {
                toast.error("Error fetching responses");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const qs = await api.get('/questions');
                setQuestions(qs.data);
            } catch (_) {
                // ignore
            } finally {
                fetchResponses();
            }
        };
        init();
    }, []);

    const getFieldFromResponse = (res, fieldKey) => {
        // 1. Try direct virtual field (e.g., res.gender)
        if (res[fieldKey] !== undefined && res[fieldKey] !== null && res[fieldKey] !== '') {
            return res[fieldKey];
        }
        // 2. Try answers[fieldKey] (lowercase)
        if (res.answers && res.answers[fieldKey] !== undefined && res.answers[fieldKey] !== null && res.answers[fieldKey] !== '') {
            return res.answers[fieldKey];
        }
        // 3. Try answers[CapitalizedFieldKey]
        const capitalized = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
        if (res.answers && res.answers[capitalized] !== undefined && res.answers[capitalized] !== null && res.answers[capitalized] !== '') {
            return res.answers[capitalized];
        }
        // 4. Try answers[question._id] (legacy or fallback)
        const q = questions.find(q => q.fieldKey === fieldKey);
        if (q && res.answers && res.answers[q._id] !== undefined && res.answers[q._id] !== null && res.answers[q._id] !== '') {
            return res.answers[q._id];
        }
        return undefined;
    };

    const handleFilter = () => {
        const filters = {};
        if (ageFilter) filters.age = ageFilter;
        if (occupationFilter) filters.occupation = occupationFilter;
        if (genderFilter) filters.gender = genderFilter;
        fetchResponses(filters, 1);
    };

    const handleReset = () => {
        setAgeFilter("");
        setOccupationFilter("");
        setGenderFilter("");
        fetchResponses({}, 1);
    };

    const handlePageChange = (newPage) => {
        const filters = {};
        if (ageFilter) filters.age = ageFilter;
        if (occupationFilter) filters.occupation = occupationFilter;
        if (genderFilter) filters.gender = genderFilter;
        fetchResponses(filters, newPage);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this response?")) {
            try {
                await api.delete(`/responses/${id}`);
                toast.success("Response deleted successfully");
                fetchResponses(); // Refresh the list
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Error deleting response");
            }
        }
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

                            <select
                                value={genderFilter}
                                onChange={e => setGenderFilter(e.target.value)}
                                className="p-2 pr-8 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 w-36 bg-white text-sm"
                            >
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="prefer not to say">Prefer not to say</option>
                            </select>
                            <input
                                type="number"
                                min="0"
                                value={ageFilter}
                                onChange={e => {
                                    const v = e.target.value.replace(/[^0-9]/g, '');
                                    setAgeFilter(v);
                                }}
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
                            <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-pink-200">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Submitted</th>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Age</th>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Gender</th>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Occupation</th>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Total Qs</th>
                                            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-pink-100">
                                        {responses.map((res, index) => (
                                            <tr
                                                key={res._id}
                                                className={`hover:bg-pink-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-pink-25'
                                                    }`}
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                    {res.createdAt ? new Date(res.createdAt).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {(() => {
                                                        const ageVal = getFieldFromResponse(res, 'age');
                                                        if (ageVal === undefined || ageVal === null || ageVal === '') return 'N/A';
                                                        const num = parseInt(ageVal, 10);
                                                        return Number.isFinite(num) ? `${num} years` : 'N/A';
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {(() => {
                                                        const g = getFieldFromResponse(res, 'gender');
                                                        const val = (g === undefined || g === null || g === '') ? 'N/A' : g;
                                                        const cls = val === 'female' ? 'bg-pink-100 text-pink-800' : val === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
                                                        return (
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${cls}`}>
                                                                {val}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {(() => {
                                                        const occ = getFieldFromResponse(res, 'occupation');
                                                        return (occ === undefined || occ === null || occ === '') ? 'N/A' : occ;
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {res.totalQuestions ?? (res.questionIds ? res.questionIds.length : 'N/A')}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            to={`/details/${res._id}`}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                                                        >
                                                            <Eye size={14} className="mr-1" /> View
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(res._id)}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                                        >
                                                            <Trash2 size={14} className="mr-1" /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {responses.length > 0 && !isRateLimited && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrevPage}
                                className="px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-2 rounded-full ${page === pagination.currentPage
                                            ? "bg-pink-500 text-white"
                                            : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.hasNextPage}
                                className="px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Pagination Info */}
                    {responses.length > 0 && !isRateLimited && (
                        <div className="text-center mt-4 text-sm text-pink-600">
                            Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{" "}
                            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                            {pagination.totalItems} responses
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AllResponsesPage;
