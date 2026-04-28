import React from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import DeleteResponseModal from "./DeleteResponseModal";
import { 
    getFieldFromResponse, 
    formatGenderDisplay, 
    getGenderDisplayClass, 
    formatAge 
} from "../../utils/responseUtils";

const ResponseTable = ({ responses, questions, onDelete }) => {
    return (
        <div className="hidden md:block">
            <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-pink-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800">
                        <tr>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Submitted</th>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Age</th>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Gender</th>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Occupation</th>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Total Qs</th>
                            <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-100">
                        {responses.map((res, index) => {
                            const ageVal = getFieldFromResponse(res, 'age', questions);
                            const g = getFieldFromResponse(res, 'gender', questions);
                            const occ = getFieldFromResponse(res, 'occupation', questions);
                            
                            return (
                                <tr
                                    key={res._id}
                                    className={`hover:bg-pink-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-pink-25'}`}
                                >
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {res.createdAt ? new Date(res.createdAt).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900">
                                        {formatAge(ageVal)}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGenderDisplayClass(g)}`}>
                                            {formatGenderDisplay(g)}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">
                                        {occ || 'N/A'}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">
                                        {res.totalQuestions ?? (res.questionIds ? res.questionIds.length : 'N/A')}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to={`/details/${res._id}`}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                                            >
                                                <Eye size={14} className="mr-1" /> View
                                            </Link>
                                            <button
                                                onClick={() => document.getElementById(`delete_modal_${res._id}`).showModal()}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                                            >
                                                <Trash2 size={14} className="mr-1" /> Delete
                                            </button>
                                            <DeleteResponseModal id={res._id} onDelete={onDelete} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResponseTable;
