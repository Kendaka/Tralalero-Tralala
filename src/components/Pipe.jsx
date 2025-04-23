import React, { useState, useEffect } from 'react';

const Pipe = ({ topHeight = 300, gap = 700, left = 300, speed = 2, onCollide, birdPosition }) => {
  const [pipeLeft, setPipeLeft] = useState(left);

  useEffect(() => {
    if (!birdPosition) return;
    
    // Bird hitbox dimensions
    const bird = {
      left: 50,
      right: 50 + 24,
      top: birdPosition,
      bottom: birdPosition + 24
    };

    // Pipe hitbox dimensions
    const pipe = {
      left: pipeLeft,
      right: pipeLeft + 80,
      topPipeBottom: topHeight,
      bottomPipeTop: topHeight + gap
    };

    // Check if bird is within pipe's x-range
    const isInXRange = bird.right > pipe.left && bird.left < pipe.right;

    // Check collision with top pipe
    const hitTopPipe = isInXRange && bird.top < pipe.topPipeBottom;

    // Check collision with bottom pipe
    const hitBottomPipe = isInXRange && bird.bottom > pipe.bottomPipeTop;

    if (hitTopPipe || hitBottomPipe) {
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