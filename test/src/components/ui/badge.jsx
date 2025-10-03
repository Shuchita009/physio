import React from 'react';

export const Badge = ({ children, className = '', ...props }) => {
  return (
    <span {...props} className={`inline-block px-2 py-1 text-xs rounded ${className}`}>
      {children}
    </span>
  );
};
