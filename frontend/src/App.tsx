import './App.css';
import HomePage from './HomePage';
import GamePage from './GamePage';
import { useState } from 'react';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <div>
      {isGameStarted ? (
        <GamePage />
      ) : (
        <HomePage startGame={() => setIsGameStarted(true)} />
      )}
    </div>
  );
}

export default App
