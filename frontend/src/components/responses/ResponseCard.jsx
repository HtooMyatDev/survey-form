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

const ResponseCard = ({ res, questions, onDelete }) => {
    const responseId = res._id || res.id;
    const ageVal = getFieldFromResponse(res, 'age', questions);
    const age = formatAge(ageVal);

    const g = getFieldFromResponse(res, 'gender', questions);
    const formattedGender = formatGenderDisplay(g);
    const cls = getGenderDisplayClass(g);

    const occ = getFieldFromResponse(res, 'occupation', questions);
    const occupation = (occ === undefined || occ === null || occ === '') ? 'N/A' : occ;

    const openDeleteModal = () => {
        document.getElementById(`delete_modal_${responseId}`).showModal();
    };

    return (
        <div className="bg-white rounded-2xl border border-pink-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">
                    {res.createdAt ? new Date(res.createdAt).toLocaleDateString() : 'N/A'}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
                    {formattedGender}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                    <span className="text-pink-600 font-medium">Age:</span>{' '}
                    <span className="text-gray-700">{age}</span>
                </div>
                <div>
                    <span className="text-pink-600 font-medium">Qs:</span>{' '}
                    <span className="text-gray-700">{res.totalQuestions ?? 'N/A'}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-pink-600 font-medium">Occupation:</span>{' '}
                    <span className="text-gray-700">{occupation}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    to={`/details/${responseId}`}
                    className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-pink-700 bg-pink-100 hover:bg-pink-200 transition-colors"
                >
                    <Eye size={14} className="inline mr-1" /> View
                </Link>
                <button
                    onClick={openDeleteModal}
                    className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                >
                    <Trash2 size={14} className="inline mr-1" /> Delete
                </button>
            </div>
            <DeleteResponseModal id={responseId} onDelete={onDelete} />
        </div>
    );
};

export default ResponseCard;
