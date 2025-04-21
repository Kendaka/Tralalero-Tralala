import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';

const TralaleroMovement = ({ gameStarted, onGameOver }) => {
  const [position, setPosition] = useState(100);
  const [rotation, setRotation] = useState(0); // Tilt angle (degrees)
  const velocity = useRef(0);
  const isGameOver = useRef(false);

  // Physics constants (tweak these for feel)
  const JUMP_FORCE = -12; // Negative = upward
  const GRAVITY = 0.5;
  const MAX_ROTATION = 25; // Max tilt angle
  const ROTATION_SPEED = 5; // How fast tilt changes

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        velocity.current = JUMP_FORCE;
        setRotation(-MAX_ROTATION); // Tilt upward immediately on jump
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  // Game physics loop
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const gameLoop = setInterval(() => {
      // Apply gravity
      velocity.current += GRAVITY;
      setPosition(prev => prev + velocity.current);

      // Dynamic rotation based on velocity
      setRotation(prev => {
        const targetRotation = Math.min(MAX_ROTATION, velocity.current * ROTATION_SPEED);
        return lerp(prev, targetRotation, 0.1); // Smooth transition
      });

      // Ground collision
      if (position > 500) {
        isGameOver.current = true;
        onGameOver();
      }
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [gameStarted, position, onGameOver]);

  // Linear interpolation for smooth rotation
  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };

  if (!gameStarted) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img 
        src={TralaleroImage}
        alt="Tralalero"
        className="w-24 h-auto absolute origin-center transition-transform duration-100"
        style={{ 
          top: `${position}px`, 
          left: '50px',
          transform: `scaleX(-1) rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
        }}
      />
    </div>
  );
};

export default TralaleroMovement;