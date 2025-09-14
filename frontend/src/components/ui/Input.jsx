import React from 'react';

const Input = ({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`form-input ${className}`}
        {...props}
      />
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;