import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text text-pink-600 font-semibold">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 rounded-2xl text-gray-800 placeholder-pink-400 ${Icon ? 'pl-12' : ''} ${
            error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
          }`}
          {...props}
        />
        {Icon && (
          <Icon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
        )}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default FormInput;
