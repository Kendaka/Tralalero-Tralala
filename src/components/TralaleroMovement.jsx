import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';

const TralaleroMovement = ({ gameStarted, onGameOver }) => {
  const [position, setPosition] = useState(100);
  const gameAreaRef = useRef(null);
  const isGameOver = useRef(false); 

  useEffect(() => {
    if (gameStarted) {
      setPosition(100);
      isGameOver.current = false;
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const gravityInterval = setInterval(() => {
      setPosition(prev => {
        const newPosition = prev + 2;
        
        if (newPosition > 500 && !isGameOver.current) {
          isGameOver.current = true;
          onGameOver(); 
          return prev; 
        }
        
        return newPosition;
      });
    }, 20);

    return () => clearInterval(gravityInterval);
  }, [gameStarted, onGameOver]);

  if (!gameStarted) return null;

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