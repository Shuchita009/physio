import React from 'react';

export const Button = ({ children, className = '', variant = 'primary', size = '', ...props }) => {
  const variantClass = variant === 'primary' ? 'primary' : variant === 'outline' ? 'outline' : '';
  const sizeClass = size === 'sm' ? 'small' : size === 'lg' ? 'large' : '';

  const classes = `ui-button ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
