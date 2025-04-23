import React, { useState, useEffect } from 'react';

const Pipe = ({ topHeight = 150, gap = 300, left = 300, speed = 2, onCollide, birdPosition }) => {
  const [pipeLeft, setPipeLeft] = useState(left);

  useEffect(() => {
    if (!birdPosition) return;
    
    const birdRight = 50 + 24; 
    const birdLeft = 50;
    const birdTop = birdPosition;
    const birdBottom = birdPosition + 24;

    if (
      birdRight > pipeLeft && 
      birdLeft < pipeLeft + 80 &&
      (birdTop < topHeight || birdBottom > topHeight + gap)
    ) {
      onCollide();
    }
  }, [pipeLeft, birdPosition, topHeight, gap]);

  useEffect(() => {
    const movePipe = setInterval(() => {
      setPipeLeft(prev => prev - speed);
    }, 16);
    return () => clearInterval(movePipe);
  }, [speed]);

  return (
    <div className="absolute" style={{ left: `${pipeLeft}px` }}>
      <div 
        className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
        style={{ 
          top: 0, 
          width: 80, 
          height: `${topHeight}px` 
        }}
      />
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