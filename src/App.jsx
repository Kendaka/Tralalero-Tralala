import { useState } from 'react';
import "./App.css";
import TralaleroMovement from './components/TralaleroMovement';
import PlayButton from './components/PlayButton';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className='bg-amber-950 h-screen w-full flex flex-col items-center justify-center'>
      {!gameStarted ? (
        <PlayButton 
          onClick={gameOver ? resetGame : () => setGameStarted(true)} 
          text={gameOver ? "Play Again" : "Start Game"}
        />
      ) : (
        <TralaleroMovement 
          gameStarted={gameStarted} 
          onGameOver={handleGameOver}
        />
      )}
    </div>
  );
}

export default App;