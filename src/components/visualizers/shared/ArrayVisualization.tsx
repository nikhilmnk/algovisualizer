
import React from 'react';

interface ArrayElement {
  value: number;
  state?: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'selected';
  height?: number;
}

interface ArrayVisualizationProps {
  elements: ArrayElement[];
  maxValue?: number;
  showValues?: boolean;
  className?: string;
}

export const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({
  elements,
  maxValue,
  showValues = true,
  className = ''
}) => {
  const max = maxValue || Math.max(...elements.map(el => el.value));
  const maxHeight = 200;

  const getElementColor = (state: string = 'default') => {
    switch (state) {
      case 'comparing': return 'bg-yellow-400';
      case 'swapping': return 'bg-red-400';
      case 'sorted': return 'bg-green-400';
      case 'pivot': return 'bg-purple-400';
      case 'selected': return 'bg-blue-400';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className={`flex items-end justify-center space-x-1 p-4 ${className}`}>
      {elements.map((element, index) => {
        const height = element.height || (element.value / max) * maxHeight;
        return (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`min-w-[20px] transition-all duration-300 ${getElementColor(element.state)} border border-gray-400 flex items-end justify-center`}
              style={{ height: `${height}px` }}
            >
              {showValues && (
                <span className="text-xs font-bold text-black pb-1">
                  {element.value}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">{index}</span>
          </div>
        );
      })}
    </div>
  );
};
