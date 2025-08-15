import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  const formatDisplay = (value: string) => {
    if (value.includes('.')) {
      return value;
    }
    
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 8,
      minimumFractionDigits: 0
    });
  };

  return (
    <div className="display">
      <div className="display-value">{formatDisplay(value)}</div>
    </div>
  );
};

export default Display;
