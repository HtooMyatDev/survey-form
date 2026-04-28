import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import SurveysNotFound from "../components/SurveysNotFound";

// Sub-components
import ResponseFilters from "../components/responses/ResponseFilters";
import ResponseTable from "../components/responses/ResponseTable";
import ResponseCard from "../components/responses/ResponseCard";
import Pagination from "../components/responses/Pagination";

const Responses = () => {
    // State
    const [responses, setResponses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter State
    const [ageFilter, setAgeFilter] = useState("");
    const [occupationFilter, setOccupationFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    
    // Pagination State
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false
    });

    // API Helpers
    const fetchResponses = useCallback(async (filters = {}, page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                ...filters,
                page: page.toString(),
                limit: "10"
            }).toString();
            
            const res = await api.get(`/responses?${params}`);
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
    }, []);

    // Initial load
    useEffect(() => {
        const init = async () => {
            try {
                const qs = await api.get('/questions');
                setQuestions(qs.data);
            } catch (err) {
                console.error("Error fetching questions:", err);
            } finally {
                fetchResponses();
            }
        };
        init();
    }, [fetchResponses]);

    // Filter Logic
    const getCurrentFilters = () => {
        const filters = {};
        if (ageFilter) filters.age = ageFilter;
        if (occupationFilter) filters.occupation = occupationFilter;
        if (genderFilter) filters.gender = genderFilter;
        return filters;
    };

    const handleFilter = () => {
        fetchResponses(getCurrentFilters(), 1);
    };

    const handleReset = () => {
        setAgeFilter("");
        setOccupationFilter("");
        setGenderFilter("");
        fetchResponses({}, 1);
    };

    const handlePageChange = (newPage) => {
        fetchResponses(getCurrentFilters(), newPage);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/responses/${id}`);
            toast.success("Response deleted successfully");
            fetchResponses(getCurrentFilters(), pagination.currentPage);
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Error deleting response");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                
                <main className="flex-1 p-3 sm:p-6 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">🎀 All Survey Responses</h1>

                    <ResponseFilters 
                        genderFilter={genderFilter}
                        setGenderFilter={setGenderFilter}
                        ageFilter={ageFilter}
                        setAgeFilter={setAgeFilter}
                        occupationFilter={occupationFilter}
                        setOccupationFilter={setOccupationFilter}
                        handleFilter={handleFilter}
                        handleReset={handleReset}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />

                    {loading ? (
                        <div className="flex text-center justify-center items-center min-h-[50vh]">
                            <span className="loading loading-spinner loading-sm"></span>
                            💌 Loading Responses...
                        </div>
                    ) : responses.length === 0 ? (
                        <SurveysNotFound />
                    ) : (
                        <>
                            {/* Desktop View */}
                            <ResponseTable 
                                responses={responses} 
                                questions={questions} 
                                onDelete={handleDelete} 
                            />

                            {/* Mobile View */}
                            <div className="md:hidden space-y-3">
                                {responses.map(res => (
                                    <ResponseCard 
                                        key={res._id} 
                                        res={res} 
                                        questions={questions} 
                                        onDelete={handleDelete} 
                                    />
                                ))}
                            </div>

                            <Pagination 
                                pagination={pagination} 
                                onPageChange={handlePageChange} 
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Responses;

