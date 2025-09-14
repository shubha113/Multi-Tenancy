import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="text-sm text-center mt-4">{message}</p>
    </div>
  );
};

export default Loading;