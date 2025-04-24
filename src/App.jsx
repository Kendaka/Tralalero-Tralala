import { useState, useEffect, useRef } from 'react';
import "./App.css";
import TralaleroMovement from './components/TralaleroMovement';
import MovingBackground from './components/MovingBackground';
import PlayButton from './components/PlayButton';
import Score from './components/Score'; // Add this import
import gameOverSound from './assets/tralaleroSound.mp3';

function App() {
  const [gameState, setGameState] = useState('idle');
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(gameOverSound);
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  const startGame = () => {
    setGameState('playing');
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleGameOver = () => {
    setGameState('gameover');
    audioRef.current.play();
  };

  return (
    <div className="relative h-screen w-full bg-amber-200 overflow-hidden">
      {/* Background (bottom layer) */}
      <MovingBackground />
      
      {/* High Score (top layer) */}
      <Score />

      {/* Game content (middle layer) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {gameState !== 'playing' ? (
          <PlayButton 
            onClick={startGame}
            text={gameState === 'gameover' ? "Play Again" : "Start Game"}
          />
        ) : (
          <TralaleroMovement 
            gameStarted={true} 
            onGameOver={handleGameOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;