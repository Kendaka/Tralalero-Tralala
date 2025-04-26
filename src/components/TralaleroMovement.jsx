import { useState, useEffect, useRef } from 'react';
import TralaleroImage from '../assets/tralalero.png';
import Pipe from './Pipe';
import jumpSound from '../assets/jumpingSound.mp3';
import scoreSound from '../assets/scoreSound.mp3';

const TralaleroMovement = ({ gameStarted, onGameOver, incrementScore }) => {
  const [position, setPosition] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [pipes, setPipes] = useState([]);
  const velocity = useRef(0);
  const isGameOver = useRef(false);
  const audioRef = useRef(null);
  const gameAreaRef = useRef(null);
  const frameCount = useRef(0);
  const passedPipes = useRef(new Set());
  const scoreAudioRef = useRef(null);

  // Constants
  const JUMP_FORCE = -8; // Adjust this value to change the jump height
  const GRAVITY = 0.4; // Adjust this value to change the falling speed
  const MAX_ROTATION = 25; // Maximum rotation angle in degrees
  const ROTATION_SPEED = 5; // Speed of rotation
  const CEILING_HEIGHT = 0; // Adjust this value to change the ceiling height
  const PIPE_SPEED = 2; // Speed of the pipes moving towards the bird
  const PIPE_SPAWN_RATE = 120;  // Adjust this value to change the frequency of pipe generation
  const BIRD_WIDTH = 24; // Width of the bird image
  const BIRD_HEIGHT = 24; // Height of the bird image
  const GROUND_HEIGHT = 500; // Adjust this value to change the ground height
  const BIRD_X_POSITION = 50; // X position of bird

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(jumpSound);
    scoreAudioRef.current = new Audio(scoreSound); 
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (scoreAudioRef.current) {
        scoreAudioRef.current.pause();
        scoreAudioRef.current = null;
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
          gap: 180
        }
      ]);
    }, PIPE_SPAWN_RATE * 16);

    return () => clearInterval(pipeInterval);
  }, [gameStarted]);

  // Handle both keyboard and touch input
  useEffect(() => {
    if (!gameStarted || isGameOver.current) return;

    const handleJump = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      velocity.current = JUMP_FORCE;
      setRotation(-MAX_ROTATION);
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      handleJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Add touch event listener to the game area
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener('touchstart', handleTouchStart, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameArea) {
        gameArea.removeEventListener('touchstart', handleTouchStart);
      }
    };
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
        
        // Ceiling collision
        if (newPosition < CEILING_HEIGHT) {
          velocity.current = 0;
          return CEILING_HEIGHT;
        }
        
        // Ground collision
        if (newPosition > GROUND_HEIGHT - BIRD_HEIGHT) {
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

      // Check for passed pipes
      pipes.forEach(pipe => {
        if (!passedPipes.current.has(pipe.id) && pipe.left + 80 < BIRD_X_POSITION) {
          passedPipes.current.add(pipe.id);
          incrementScore();
          if (scoreAudioRef.current) {
            scoreAudioRef.current.currentTime = 0;
            scoreAudioRef.current.play();
          }
        }
      });

      // Update pipe positions and clean up off-screen pipes
      setPipes(prev => prev
        .map(pipe => ({
          ...pipe,
          left: pipe.left - PIPE_SPEED
        }))
        .filter(pipe => pipe.left > -80)
      );

    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, pipes, position, onGameOver, incrementScore]);

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };

  if (!gameStarted) return null;

  return (
    <div 
      ref={gameAreaRef} 
      className="relative w-full h-full overflow-hidden touch-none"
      style={{ touchAction: 'none' }}
    >
      {pipes.map(pipe => (
        <Pipe
          key={pipe.id}
          left={pipe.left}
          topHeight={pipe.topHeight}
          gap={pipe.gap}
          onCollide={() => {
            isGameOver.current = true;
            onGameOver();
          }}
          birdPosition={position}
          birdWidth={BIRD_WIDTH}
          birdHeight={BIRD_HEIGHT}
        />
      ))}
      
      <img 
        src={TralaleroImage}
        alt="Tralalero"
        className="w-10 h-auto absolute origin-center transition-transform duration-100 z-10"
        style={{ 
          top: `${position}px`, 
          left: `${BIRD_X_POSITION}px`,
          transform: `scaleX(-1) rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
        }}
      />
    </div>
  );
};

export default TralaleroMovement;