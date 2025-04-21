import { useState } from 'react';
import "./App.css";
import TralaleroMovement from './components/TralaleroMovement';
import PlayButton from './components/PlayButton';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className='bg-amber-950 h-screen w-full flex flex-col items-center justify-center'>
      {!gameStarted ? (
        <PlayButton onClick={() => setGameStarted(true)} /> 
      ) : (
        <TralaleroMovement gameStarted={gameStarted} />  
      )}
    </div>
  );
}

export default App;