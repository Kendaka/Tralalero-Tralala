import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';

const TralaleroMovement = ({ gameStarted, onGameOver }) => {
  const [position, setPosition] = useState(100);
  const gameAreaRef = useRef(null);

  // Gravity effect
  useEffect(() => {
    if (!gameStarted) return;

    const gravityInterval = setInterval(() => {
      setPosition(prev => {
        const newPosition = prev + 2;
        
        // Game over condition (adjust 500 to your screen height)
        if (newPosition > 500) {
          onGameOver();
          return 100; // Reset position
        }
        
        return newPosition;
      });
    }, 20);

    return () => clearInterval(gravityInterval);
  }, [gameStarted, onGameOver]);

  return (
    <div ref={gameAreaRef} className="relative w-full h-full overflow-hidden">
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