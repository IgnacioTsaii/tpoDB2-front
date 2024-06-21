import React from 'react';

const ProgressBar = ({ progress }) => {
  const getProgressColor = () => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-6">
      <div
        className={`h-6 rounded-full ${getProgressColor()}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
