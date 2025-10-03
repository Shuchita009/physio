import React from 'react';

// Simple Select implementation that extracts SelectItem children to render a native <select>
export const Select = ({ children, onValueChange = () => {}, value, disabled }) => {
  // Extract SelectItem children to build options list
  const items = React.Children.toArray(children).flatMap(child => {
    if (!React.isValidElement(child)) return [];
    if (child.type && child.type.displayName === 'SelectContent') {
      return React.Children.toArray(child.props.children).filter(React.isValidElement).map(c => c.props);
    }
    return [];
  });

  return (
    <div className="relative">
      {/* Render original children for UI triggers/content (they are simple wrappers) */}
      <div className="select-ui">{children}</div>

      {/* Hidden native select for form behavior */}
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
      >
        <option value="">{/* allow empty */}</option>
        {items.map((item, idx) => (
          <option key={idx} value={item.value}>{item.children}</option>
        ))}
      </select>
    </div>
  );
};

export const SelectTrigger = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};
SelectValue.displayName = 'SelectValue';

export const SelectContent = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
SelectContent.displayName = 'SelectContent';

export const SelectItem = ({ children }) => {
  // This component itself doesn't render DOM when used inside Select; Select extracts its props
  return null;
};
SelectItem.displayName = 'SelectItem';
