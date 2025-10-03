import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input {...props} className={`w-full border rounded px-3 py-2 ${className}`} />
  );
};
