import { useState, useEffect, useRef } from 'react';
import "./App.css";
import TralaleroMovement from './components/TralaleroMovement';
import MovingBackground from './components/MovingBackground';
import PlayButton from './components/PlayButton';
import Score from './components/Score';
import gameOverSound from './assets/tralaleroSound.mp3';

function App() {
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const audioRef = useRef(null);

  // Update high score when game ends
  useEffect(() => {
    if (gameState === 'gameover' && score > highScore) {
      setHighScore(score);
    }
  }, [gameState, score, highScore]);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(gameOverSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
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
      
      {/* Score displays */}
      <Score score={score} highScore={highScore} isGameActive={gameState === 'playing'} />

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
  onScoreUpdate={(newScore) => setScore(newScore)} // Changed to direct value update
/>
        )}
      </div>
    </div>
  );
}

export default App;