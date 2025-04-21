import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';

const TralaleroMovement = ({ gameStarted, onGameOver }) => {
  const [position, setPosition] = useState(100);
  const [isJumping, setIsJumping] = useState(false);
  const isGameOver = useRef(false);
  const jumpPower = 50;
  const gravity = 2;

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsJumping(true);
        setPosition(prev => Math.max(0, prev - jumpPower));
        setTimeout(() => setIsJumping(false), 300); // Reset jump state after animation
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  // Gravity effect
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const gravityInterval = setInterval(() => {
      setPosition(prev => {
        const newPosition = prev + gravity;
        
        if (newPosition > 500) {
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
    <div className="relative w-full h-full overflow-hidden">
      <img 
        src={TralaleroImage}
        alt="Tralalero"
        className={`w-24 h-auto absolute transition-transform duration-300 ease-out ${
          isJumping ? 'scale-x-[-1] -translate-y-2' : 'scale-x-[-1]'
        }`}
        style={{ 
          top: `${position}px`, 
          left: '50px'
        }}
      />
    </div>
  );
};

export default TralaleroMovement;