import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader } from 'lucide-react';

const FormField = ({
    label,
    type = 'text',
    value,
    onChange,
    options = [],
    required = false,
    error = '',
    placeholder = '',
    multiline = false,
    ...props
}) => {
    const baseInputClass = `
        w-full px-4 py-3 rounded-xl border-2 border-pink-200
        focus:border-pink-400 focus:ring-2 focus:ring-pink-200
        focus:outline-none transition-all bg-pink-50
        disabled:opacity-50 disabled:cursor-not-allowed
        placeholder-pink-300
    `;

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-semibold text-gray-700">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                </label>
            )}

            {type === 'select' ? (
                <select value={value} onChange={onChange} className={`${baseInputClass} text-gray-700`} {...props}>
                    <option value="">{placeholder || 'Select an option'}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${baseInputClass} resize-none`}
                    rows="4"
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={baseInputClass}
                    {...props}
                />
            )}

            {error && (
                <div className="label mt-1">
                    <span className="label-text-alt text-red-500 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FormField;
