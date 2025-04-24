import React, { useEffect } from 'react';

const Pipe = ({ topHeight = 300, gap = 180, left = 300, onCollide, birdPosition, birdWidth, birdHeight }) => {
  useEffect(() => {
    if (!birdPosition) return;
    
    // Bird hitbox dimensions
    const bird = {
      left: 50, 
      right: 50 + birdWidth,
      top: birdPosition,
      bottom: birdPosition + birdHeight
    };

    // Pipe hitbox dimensions
    const pipe = {
      left: left,
      right: left + 80,
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
  }, [left, birdPosition, topHeight, gap, birdWidth, birdHeight]);

  return (
    <div className="absolute" style={{ left: `${left}px` }}>
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
        }}z
      />
    </div>
  );
};

export default Pipe;