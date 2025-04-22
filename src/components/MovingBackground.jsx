import React from 'react';

const MovingBackground = () => {
  return (
    <div 
      className="absolute inset-0 bg-[url('/assets/movingBackground.png')] bg-repeat-x"
      style={{
        backgroundSize: 'auto 100%',
        animation: 'moveBg 15s linear infinite',
        zIndex: 0 
      }}
    ></div>
  );
};

export default MovingBackground;