import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const ResponseFilters = ({
    genderFilter,
    setGenderFilter,
    ageFilter,
    setAgeFilter,
    occupationFilter,
    setOccupationFilter,
    handleFilter,
    handleReset,
    showFilters,
    setShowFilters
}) => {
    return (
        <div className="mb-6 space-y-3">
            {/* Search + Toggle */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search responses..."
                        className="h-10 w-full pl-10 pr-4 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/80 backdrop-blur-sm text-sm transition-all shadow-sm"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="sm:hidden flex items-center justify-center h-10 w-10 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-all shadow-sm active:scale-95 shrink-0"
                >
                    <Filter size={18} />
                </button>
            </div>

            {/* Filter controls - always visible on desktop, toggleable on mobile */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:items-center ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
                <div className="relative w-full sm:w-40 group">
                    <select
                        value={genderFilter}
                        onChange={e => setGenderFilter(e.target.value)}
                        className="appearance-none h-10 w-full pl-4 pr-10 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-sm transition-all shadow-sm cursor-pointer"
                    >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="prefer not to say">Prefer not to say</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:text-pink-500 transition-colors" />
                </div>
                <div className="w-full sm:w-28">
                    <input
                        type="number"
                        min="0"
                        value={ageFilter}
                        onChange={e => {
                            const v = e.target.value.replace(/[^0-9]/g, '');
                            setAgeFilter(v);
                        }}
                        placeholder="Age"
                        className="h-10 w-full px-4 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-sm transition-all"
                    />
                </div>
                <div className="w-full sm:w-48">
                    <input
                        type="text"
                        value={occupationFilter}
                        onChange={e => setOccupationFilter(e.target.value)}
                        placeholder="Occupation"
                        className="h-10 w-full px-4 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm shadow-sm transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-pink-500 text-white px-5 h-10 rounded-full hover:bg-pink-600 transition-all text-sm font-medium shadow-sm active:scale-95"
                        onClick={handleFilter}
                        type="button"
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                    <button
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-pink-600 px-5 h-10 rounded-full hover:bg-pink-50 border border-pink-200 transition-all text-sm font-medium shadow-sm active:scale-95"
                        onClick={handleReset}
                        type="button"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponseFilters;
