import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';

const TralaleroMovement = () => {
  const [position, setPosition] = useState(100); // Initial Y position
  const [gameStarted, setGameStarted] = useState(false);
  const gameAreaRef = useRef(null);

  // Gravity effect
  useEffect(() => {
    if (!gameStarted) return;

    const gravityInterval = setInterval(() => {
      setPosition(prev => prev + 2); // Fall speed
    }, 20);

    return () => clearInterval(gravityInterval);
  }, [gameStarted]);

  return (
    <div 
      ref={gameAreaRef} 
      className="relative w-full h-full overflow-hidden"
      onClick={() => setGameStarted(true)} // Start game on click
    >
      <img 
        src={TralaleroImage}
        alt="Tralalero"
        className="w-24 h-auto scale-x-[-1] absolute"
        style={{ top: `${position}px`, left: '50px' }}
      />
    </div>
  );
};

export default TralaleroMovement;