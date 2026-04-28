import React from 'react';
import { Sparkles, Sprout, Ribbon, ChevronDown, Trash2, Heart, RefreshCcw } from 'lucide-react';
import Button from '../common/Button';
import { slugify, isOrderTaken, getNextAvailableOrder } from '../../utils/questionUtils';

const QuestionForm = ({
    formData,
    setFormData,
    editingQuestion,
    orderError,
    setOrderError,
    optionError,
    setOptionError,
    onSubmit,
    onCancel,
    questions
}) => {
    const addOption = () => {
        const texts = formData.options.map(opt => opt.text.trim().toLowerCase());
        if (texts.includes("")) {
            setOptionError("Please fill in the previous option before adding a new one.");
            return;
        }
        setOptionError("");
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { text: "", value: "" }]
        }));
    };

    const removeOption = (index) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    const updateOption = (index, field, value) => {
        let newOptions = formData.options.map((option, i) => {
            if (i === index) {
                if (field === 'text') {
                    const newText = value;
                    return { ...option, text: newText, value: slugify(newText) };
                }
                return { ...option, [field]: value };
            }
            return option;
        });

        // Check for duplicate option texts (case-insensitive, ignore self)
        const texts = newOptions.map(opt => opt.text.trim().toLowerCase());
        const hasDuplicate = texts.some((text, idx) => text && texts.indexOf(text) !== idx);
        setOptionError(hasDuplicate ? "Duplicate option text is not allowed." : "");

        setFormData(prev => ({ ...prev, options: newOptions }));
    };

    const handleOrderChange = (e) => {
        const val = parseInt(e.target.value);
        const orderVal = isNaN(val) ? 0 : val;
        setFormData(prev => ({ ...prev, order: orderVal }));
        
        if (isOrderTaken(questions, orderVal, editingQuestion?._id)) {
            setOrderError(`Position ${orderVal} is already occupied.`);
        } else {
            setOrderError("");
        }
    };

    return (
        <div className="bg-white rounded-3xl p-4 sm:p-6 mb-6 shadow-lg border border-pink-200">
            <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
                {editingQuestion ? (
                    <>
                        <Sparkles className="w-6 h-6 text-pink-400" />
                        Update Your Question
                    </>
                ) : (
                    <>
                        <Sprout className="w-6 h-6 text-pink-400" />
                        Create a New Question
                    </>
                )}
            </h2>
            <form onSubmit={onSubmit} className="space-y-8">
                {/* Section 1: Question Content */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">1</div>
                        <h3>What would you like to ask?</h3>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            Question Text <Ribbon className="w-4 h-4 text-pink-400" />
                        </label>
                        <textarea
                            value={formData.questionText}
                            onChange={(e) => setFormData(prev => ({ ...prev, questionText: e.target.value }))}
                            placeholder="Example: How are you feeling today?"
                            className="w-full p-4 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-gray-800 transition-all min-h-[100px]"
                            required
                        />
                    </div>
                </div>

                {/* Section 2: Response Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">2</div>
                            <h3>How should they answer?</h3>
                        </div>
                        <div className="relative group">
                            <select
                                value={formData.questionType}
                                onChange={(e) => setFormData(prev => ({ ...prev, questionType: e.target.value }))}
                                className="w-full h-12 pl-4 pr-10 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm appearance-none text-gray-800 transition-all cursor-pointer"
                            >
                                <option value="text">Text (Type an answer)</option>
                                <option value="radio">Single Choice (Select one)</option>
                                <option value="checkbox">Multiple Choice (Select many)</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:text-pink-500 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">3</div>
                            <h3>Which section is this in?</h3>
                        </div>
                        <div className="relative group">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full h-12 pl-4 pr-10 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm appearance-none text-gray-800 transition-all cursor-pointer"
                            >
                                <option value="demographics">About the Person (Demographics)</option>
                                <option value="stress">Stress & Anxiety</option>
                                <option value="coping">Coping Strategies</option>
                                <option value="general">General Feelings</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:text-pink-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Section 3: Advanced Settings */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">4</div>
                        <h3>Survey Settings</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">Display Order</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.order}
                                    readOnly
                                    className="w-full h-12 px-4 bg-gray-50 border-2 border-pink-100 rounded-2xl text-sm text-gray-500 cursor-not-allowed transition-all"
                                    title="Order is managed automatically"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-pink-400 uppercase">
                                    Auto
                                </div>
                            </div>
                            <p className="text-[10px] text-pink-400 mt-1">This number is assigned automatically to keep your survey organized.</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">Logic Key (Internal)</label>
                            <input
                                type="text"
                                value={formData.fieldKey}
                                onChange={(e) => setFormData(prev => ({ ...prev, fieldKey: e.target.value.trim() }))}
                                placeholder="e.g., age"
                                className="w-full h-12 px-4 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm text-gray-800 transition-all"
                            />
                            <p className="text-[10px] text-pink-400 mt-1 leading-tight">Optional. Helps the dashboard identify specific data like age.</p>
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.isRequired}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isRequired: e.target.checked }))}
                                        className="checkbox checkbox-primary rounded-lg border-2"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">They MUST answer this</span>
                            </label>
                        </div>
                    </div>
                </div>

                {(formData.questionType === 'radio' || formData.questionType === 'checkbox') && (
                    <div className="space-y-4 pt-4 border-t-2 border-pink-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-pink-600 font-bold">
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">5</div>
                                <h3>Possible Answers</h3>
                            </div>
                            <button
                                type="button"
                                onClick={addOption}
                                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-xs font-bold transition-all shadow-sm active:scale-95"
                            >
                                + Add New Option
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {optionError && (
                                <div className="col-span-full text-xs text-red-500 animate-pulse">{optionError}</div>
                            )}
                            {formData.options.map((option, index) => (
                                <div key={index} className="flex gap-2 group">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            value={option.text}
                                            onChange={(e) => updateOption(index, 'text', e.target.value)}
                                            className="w-full p-3 bg-pink-50 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:outline-none text-sm text-gray-800 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="w-10 h-11 bg-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shrink-0"
                                        title="Remove this option"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {formData.options.length === 0 && (
                                <div className="col-span-full py-8 text-center border-2 border-dashed border-pink-100 rounded-2xl text-pink-300 text-sm italic">
                                    Click 'Add New Option' to start building your choices!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-pink-50">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2"
                        disabled={!!optionError}
                    >
                        {editingQuestion ? (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Update Question
                            </>
                        ) : (
                            <>
                                <Heart className="w-4 h-4" />
                                Create Question
                            </>
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="flex-1 sm:flex-none"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default QuestionForm;
