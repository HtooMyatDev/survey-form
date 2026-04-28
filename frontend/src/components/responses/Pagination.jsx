import React from "react";

const Pagination = ({ pagination, onPageChange }) => {
    if (pagination.totalPages <= 1) return null;

    return (
        <div className="mt-6 space-y-4">
            <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                <button
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-3 sm:px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed text-sm transition-all shadow-sm active:scale-95"
                >
                    Prev
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(page => {
                            const current = pagination.currentPage;
                            if (pagination.totalPages <= 5) return true;
                            return page === 1 || page === pagination.totalPages ||
                                Math.abs(page - current) <= 1;
                        })
                        .map((page, idx, arr) => (
                            <React.Fragment key={page}>
                                {idx > 0 && arr[idx - 1] !== page - 1 && (
                                    <span className="px-1 text-pink-400">…</span>
                                )}
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`px-3 py-2 rounded-full text-sm transition-all shadow-sm active:scale-95 ${page === pagination.currentPage
                                        ? "bg-pink-500 text-white"
                                        : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                                        }`}
                                >
                                    {page}
                                </button>
                            </React.Fragment>
                        ))}
                </div>

                <button
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-3 sm:px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed text-sm transition-all shadow-sm active:scale-95"
                >
                    Next
                </button>
            </div>

            <div className="text-center text-xs sm:text-sm text-pink-600">
                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{" "}
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                {pagination.totalItems} responses
            </div>
        </div>
    );
};

export default Pagination;
