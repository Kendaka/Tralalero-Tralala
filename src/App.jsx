import { useState, useEffect, useRef } from 'react';
import "./App.css";
import TralaleroMovement from './components/TralaleroMovement';
import PlayButton from './components/PlayButton';
import gameOverSound from './assets/tralaleroSound.mp3'; // Adjust file extension

function App() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
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
    <div className='bg-amber-950 h-screen w-full flex flex-col items-center justify-center'>
      {gameState !== 'playing' && (
        <PlayButton 
          onClick={startGame}
          text={gameState === 'gameover' ? "Play Again" : "Start Game"}
        />
      )}
      {gameState === 'playing' && (
        <TralaleroMovement 
          gameStarted={true} 
          onGameOver={handleGameOver}
        />
      )}
    </div>
  );
}

export default App;