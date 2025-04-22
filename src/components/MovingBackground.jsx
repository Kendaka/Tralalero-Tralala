import React from 'react';

const MovingBackground = () => {
  return (
    <div 
      className="absolute inset-0 bg-[url('/assets/movingBackground.png')] bg-repeat-x moving-bg z-0"
    ></div>
  );
};

export default MovingBackground;

