import React, { useState } from "react";
import Board from "./components/Board";
import {init} from "./gameLogic.js"
const App = () => {
  const [board, setBoard] = useState(init());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [fade,setFade] = useState(""); 

  const resetGame =  () =>{
    setFade("fade-out")
    setTimeout(()=>{
      setScore(0);
      setGameOver(false);
      setBoard(init());
      setFade("fade-in")
    },500)
  }

  return (
    <div className="text-center mt-[50px]">
      <div className="flex items-center justify-center gap-[90px] mb-[15px]">
        <div className="text-[60px] text-[#90ee90] font-bold">2048</div>
        <div>
          <div className="text-[30px] rounded-[10px] bg-[#f5f5dc] text-[#000] px-[60px] border-[#90ee90] py-[4px]">
            <h1 className="font-bold font-josefin text-[25px] mb-[-12px]">Score</h1>
            <div className="font-bold">{score}</div>
          </div>
        </div>
      </div>
      <Board
        gameOver={gameOver}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        board={board}
        setBoard = {setBoard}
        fade = {fade}
      />
      {gameOver && (
        <div className="mt-[25px] flex items-center justify-center gap-[40px]">
          <div className="text-[40px] text-[#f5f5dc] font-bold font-josefin">
            Game Over !!
          </div>
          <button
            className="button text-[20px] text-[#000] font-bold font-josefin px-[15px] py-[10px] bg-[#90ee90] rounded-[10px]" onClick = {resetGame}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
