import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer';

  const variants = {
    primary: 'bg-pink-400 text-white hover:bg-pink-500 active:scale-95 disabled:opacity-50',
    secondary: 'bg-pink-100 text-pink-600 hover:bg-pink-200 active:scale-95 disabled:opacity-50',
    danger: 'bg-red-400 text-white hover:bg-red-500 active:scale-95 disabled:opacity-50'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <span className="loading loading-spinner loading-sm"></span> : children}
    </button>
  );
};

export default Button;
