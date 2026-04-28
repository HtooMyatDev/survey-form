import React from "react";
import { Cat, Heart } from "lucide-react";
import Button from "../common/Button";

const DeleteQuestionModal = ({ id, onDelete }) => {
    return (
        <dialog id={`delete_modal_${id}`} className="modal backdrop-blur-sm">
            <div className="modal-box bg-white border-2 border-pink-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-pink-700">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <Cat className="w-16 h-16 text-pink-400" />
                    </div>
                    <h3 className="font-bold text-xl text-pink-700">Are You Sure?</h3>
                    <p className="py-2 text-gray-600 flex items-center justify-center gap-2">
                        Are you sure you want to delete this question?
                        <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </p>
                </div>
                <div className="modal-action flex w-full justify-center">
                    <form method="dialog" className="flex gap-3 w-full sm:w-auto">
                        <Button variant="secondary" className="flex-1 sm:flex-none">Cancel</Button>
                        <Button
                            onClick={() => onDelete(id)}
                            variant="primary"
                            className="flex-1 sm:flex-none"
                        >
                            Confirm Delete
                        </Button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteQuestionModal;
