import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div {...props} className={`ui-card ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div {...props} className={`ui-card-header ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div {...props} className={`ui-card-content ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 {...props} className={`ui-card-title ${className}`}>
    {children}
  </h3>
);
