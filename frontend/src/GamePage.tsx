import React, { useState, useEffect, useRef } from "react";
import { getTargetWord } from "./utils";

const ROWS = 6;
const COLUMNS = 5;
const TARGET_WORD = getTargetWord();
console.log("TARGET_WORD: " + TARGET_WORD);

const GamePage: React.FC = () => {
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""))
  );
  const [results, setResults] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const inputRefs = useRef<HTMLInputElement[][]>(
    Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null))
  );

  useEffect(() => {
    inputRefs.current[0][0]?.focus();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (rowIndex !== currentRow) return;
    
    const value = e.target.value.toUpperCase();
    if (!/^[А-ЯЁ]?$/.test(value)) return;

    setGuesses((prevGuesses) => {
      const newGuesses = prevGuesses.map((row, rIndex) =>
        rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell)) : row
      );
      return newGuesses;
    });

    if (value && colIndex < COLUMNS - 1) {
      inputRefs.current[rowIndex][colIndex + 1]?.focus();
    }
  };

  const resetGame = () => {
    setGuesses(Array.from({ length: ROWS }, () => Array(COLUMNS).fill("")));
    setResults(Array.from({ length: ROWS }, () => Array(COLUMNS).fill("")));
    setCurrentRow(0);
    setTimeout(() => inputRefs.current[0][0]?.focus(), 0);
  };

  const checkGuess = () => {
    const word = guesses[currentRow].join("").toUpperCase(); // Приводим к верхнему регистру
    if (word.length < COLUMNS) return;
  
    const targetLetters = TARGET_WORD.toUpperCase().split(""); // Приводим загаданное слово к верхнему регистру
    const guessLetters = [...word];
    const letterCounts: Record<string, number> = {};
    
    targetLetters.forEach(letter => letterCounts[letter] = (letterCounts[letter] || 0) + 1);
    
    const newResults = results.map((row, rIndex) =>
      rIndex === currentRow ? [...row] : row
    );
    
    guessLetters.forEach((letter, i) => {
      if (letter === targetLetters[i]) {
        newResults[currentRow][i] = "green";
        letterCounts[letter]--;
      }
    });
    
    guessLetters.forEach((letter, i) => {
      if (newResults[currentRow][i] !== "green" && letterCounts[letter] > 0) {
        newResults[currentRow][i] = "yellow";
        letterCounts[letter]--;
      } else if (newResults[currentRow][i] !== "green") {
        newResults[currentRow][i] = "gray";
      }
    });
  
    setResults(newResults);
    
    if (word === TARGET_WORD.toUpperCase()) { // Учитываем верхний регистр
      alert("Поздравляем! Вы угадали слово!");
      resetGame();
      return;
    }
    
    if (currentRow === ROWS - 1) {
      alert("Вы проиграли! Загаданное слово: " + TARGET_WORD);
      resetGame();
      return;
    }
  
    setCurrentRow(currentRow + 1);
    setTimeout(() => inputRefs.current[currentRow + 1][0]?.focus(), 0);
  };
  

  useEffect(() => {
    if (guesses[currentRow].every(letter => letter !== "")) {
      setTimeout(() => {
        checkGuess();
      }, 1000);
    }
  }, [guesses]);
  

  return (
    <div className="game-container">
      <div className="game-grid">
        {guesses.map((row, rowIndex) => (
          <div className="game-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                ref={(el) => {
                    if (el) {
                      inputRefs.current[rowIndex][colIndex] = el;
                    }
                  }}
                type="text"
                maxLength={1}
                value={cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                className={`game-cell ${results[rowIndex][colIndex]}`}
                disabled={rowIndex !== currentRow}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
