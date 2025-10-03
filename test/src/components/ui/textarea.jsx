import React from 'react';

export const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea {...props} className={`w-full border rounded px-3 py-2 ${className}`} />
  );
};
