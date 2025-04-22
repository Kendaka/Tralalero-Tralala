import React from 'react';

const Pipe = ({ topHeight = 200, gap = 150, left = 300 }) => {
  return (
    <div className="absolute" style={{ left: `${left}px` }}>
      {/* Top Pipe */}
      <div 
        className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
        style={{ 
          top: 0, 
          width: 80, 
          height: `${topHeight}px` 
        }}
      />
      
      {/* Bottom Pipe */}
      <div 
        className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
        style={{ 
          top: `${topHeight + gap}px`, 
          width: 80, 
          height: '100vh' 
        }}
      />
    </div>
  );
};

export default Pipe;