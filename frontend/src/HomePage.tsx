// src/HomePage.tsx
import React from "react";

interface HomePageProps {
  startGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ startGame }) => {
  return (
    <div className="home-container">
      <button className="play-button" onClick={startGame}>
        Играть
      </button>
    </div>
  );
};

export default HomePage;
