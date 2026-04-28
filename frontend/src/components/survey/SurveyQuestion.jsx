import React from 'react';

const SurveyQuestion = ({ 
    question, 
    value, 
    otherValue, 
    onInputChange, 
    onCheckboxChange, 
    onOtherRadioSelect, 
    onOtherRadioInput, 
    onOtherCheckboxToggle, 
    onOtherCheckboxInput 
}) => {
    switch (question.questionType) {
        case 'text':
            return (
                <div className="space-y-2">
                    <label className="block mb-2 font-semibold text-gray-800">
                        {question.order + 1}. {question.questionText}
                        {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type={question.fieldKey === 'age' ? 'number' : 'text'}
                        value={value || ''}
                        onChange={(e) => {
                            let v = e.target.value;
                            if (question.fieldKey === 'age') {
                                v = (v || '').toString().replace(/[^0-9]/g, '');
                            }
                            onInputChange(question._id, v);
                        }}
                        placeholder="Enter your answer..."
                        className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                        required={question.isRequired}
                        min={question.fieldKey === 'age' ? 0 : undefined}
                        inputMode={question.fieldKey === 'age' ? 'numeric' : undefined}
                    />
                </div>
            );

        case 'radio':
            return (
                <div className="space-y-2">
                    <label className="block mb-2 font-semibold text-gray-800">
                        {question.order + 1}. {question.questionText}
                        {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isOther = option.value.toLowerCase() === 'other' || option.text.toLowerCase() === 'other';
                            return (
                                <div key={index}>
                                    <label className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={isOther ? '__other__' : option.value}
                                            checked={isOther ? value === '__other__' : value === option.value}
                                            onChange={() => {
                                                if (isOther) {
                                                    onOtherRadioSelect(question._id);
                                                } else {
                                                    onInputChange(question._id, option.value);
                                                }
                                            }}
                                            className="radio radio-primary radio-sm"
                                            required={question.isRequired}
                                        />
                                        <span className="text-gray-700">{option.text}</span>
                                    </label>
                                    {isOther && value === '__other__' && (
                                        <input
                                            type="text"
                                            className="mt-2 input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                                            placeholder="Please specify..."
                                            value={otherValue}
                                            onChange={e => onOtherRadioInput(question._id, e.target.value)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );

        case 'checkbox':
            return (
                <div className="space-y-2">
                    <label className="block mb-2 font-semibold text-gray-800">
                        {question.order + 1}. {question.questionText}
                        {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isOther = option.value.toLowerCase() === 'other' || option.text.toLowerCase() === 'other';
                            const checked = isOther
                                ? (value || []).includes('__other__')
                                : (value || []).includes(option.value);
                            return (
                                <div key={index}>
                                    <label className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={e => {
                                                if (isOther) {
                                                    onOtherCheckboxToggle(question._id, e.target.checked);
                                                } else {
                                                    onCheckboxChange(question._id, option.value);
                                                }
                                            }}
                                            className="checkbox checkbox-primary checkbox-sm"
                                        />
                                        <span className="text-gray-700">{option.text}</span>
                                    </label>
                                    {isOther && (value || []).includes('__other__') && (
                                        <input
                                            type="text"
                                            className="mt-2 input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                                            placeholder="Please specify..."
                                            value={otherValue}
                                            onChange={e => onOtherCheckboxInput(question._id, e.target.value)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );

        default:
            return <p className="text-red-500">Unsupported question type</p>;
    }
};

export default SurveyQuestion;
