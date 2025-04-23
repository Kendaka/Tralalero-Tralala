import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';
import Pipe from './Pipe';
import jumpSound from '../assets/jumpingSound.mp3';

const TralaleroMovement = ({ gameStarted, onGameOver }) => {
  const [position, setPosition] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [pipes, setPipes] = useState([]);
  const velocity = useRef(0);
  const isGameOver = useRef(false);
  const audioRef = useRef(null);
  const gameAreaRef = useRef(null);
  const frameCount = useRef(0);

  const JUMP_FORCE = -12;
  const GRAVITY = 0.5;
  const MAX_ROTATION = 25;
  const ROTATION_SPEED = 5;
  const CEILING_HEIGHT = -50;
  const PIPE_SPEED = 2;
  const PIPE_SPAWN_RATE = 120; 

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(jumpSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Pipe generation
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const pipeInterval = setInterval(() => {
      setPipes(prev => [
        ...prev,
        {
          id: Date.now(),
          left: 400,
          topHeight: 150 + Math.random() * 100,
          gap: 150
        }
      ]);
    }, PIPE_SPAWN_RATE * 16); 

    return () => clearInterval(pipeInterval);
  }, [gameStarted]);

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        velocity.current = JUMP_FORCE;
        setRotation(-MAX_ROTATION);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  // Game physics loop
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const gameLoop = setInterval(() => {
      frameCount.current += 1;
      
      // Movement
      velocity.current += GRAVITY;
      setPosition(prev => {
        const newPosition = prev + velocity.current;
        if (newPosition < CEILING_HEIGHT) {
          velocity.current = 0;
          return CEILING_HEIGHT;
        }
        if (newPosition > 500) {
          isGameOver.current = true;
          onGameOver();
          return prev;
        }
        return newPosition;
      });

      // Rotation
      setRotation(prev => {
        const targetRotation = Math.min(MAX_ROTATION, velocity.current * ROTATION_SPEED);
        return lerp(prev, targetRotation, 0.1);
      });

      // Clean up off-screen pipes
      setPipes(prev => prev.filter(pipe => pipe.left > -80));

    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, position, onGameOver]);

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };

  if (!gameStarted) return null;

  return (
    <div ref={gameAreaRef} className="relative w-full h-full overflow-hidden">
      {pipes.map(pipe => (
        <Pipe
          key={pipe.id}
          left={pipe.left}
          topHeight={pipe.topHeight}
          gap={pipe.gap}
          speed={PIPE_SPEED}
          onCollide={() => {
            isGameOver.current = true;
            onGameOver();
          }}
          birdPosition={position}
        />
      ))}
      
      <img 
        src={TralaleroImage}
        alt="Tralalero"
        className="w-24 h-auto absolute origin-center transition-transform duration-100 z-10"
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