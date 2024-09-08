import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import {init, addRandomTile, move, isGameOver} from "../gameLogic.js"

const Board = ({gameOver, setGameOver, score, setScore, board, setBoard, fade}) => {
  
  
  // Handle keydown events for arrow keys
  const handleKeyDown = (e) => {
    if (!gameOver) {
      const direction = e.key.replace("Arrow", "").toLowerCase();
      const { newBoard, score: newScore } = move(board, direction);
      if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
        setBoard(newBoard);
        setScore(score + newScore);
        addRandomTile(newBoard);
        // if (isGameOver(newBoard)) {
        //   setGameOver(true);
        // }
        setGameOver(isGameOver(newBoard))
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, score, gameOver]);

  return (
    <div className={`inline-block border-4 border-[#ccc] rounded-[6px] board ${fade}`}>
      {/* {gameOver && <div>Game Over!</div>} */}
      {/* <div className="score">Score: {score}</div> */}
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((tile, colIndex) => (
            <Tile key={colIndex} tile={tile} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
