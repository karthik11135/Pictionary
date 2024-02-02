import React, { useEffect } from "react";
import { useState } from "react";

const GameStats = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [counter, setCounter] = useState(4);
  const [randomWord, setRandomWord] = useState("*****");

  useEffect(() => {
    props.socket.on("game_player", (data) => {
      setGameStarted(true);
      setRandomWord(data);
    });

    props.socket.on("game_started", (data) => {
      setGameStarted(true);
      setRandomWord(data + " is drawing");
    });

    props.socket.on("game_continues", (data) => {
      props.socket.emit("start_game", props.roomId);
    });

    props.socket.on("game_finished", () => {
      setGameFinished(true);
    });

    return () => {
      props.socket.off("game_player");
      props.socket.off("game_started");
    };
  }, [props.socket]);

  const gameStartHandler = () => {
    setGameStarted(true);
    props.socket.emit("start_game", props.roomId);
  };

  return (
    <div className="basis-5/12 font-variety overflow-scroll">
      {!gameStarted && !gameFinished && (
        <button
          onClick={gameStartHandler}
          className="px-2 m-2 mx-2 py-0.5 hover:text-green-700 text-lg cursor-pointer font-black text-blue-600 border-yellow-800  rounded-lg inline-block border"
        >
          Start the game
        </button>
      )}
      {gameStarted && !gameFinished && (
        <h2 className="font-black font-variety text-bluish">{randomWord}</h2>
      )}
      {gameStarted && !gameFinished && (
        <div className="p-2 rounded font-black text-bluish bg-slate-200 text-center m-3">
          <h3>Timer</h3>
          <p>{counter}</p>
        </div>
      )}
      {gameFinished && (
        <>
          <div className="p-2 rounded-lg bg-slate-200 text-center m-3 overflow-scroll h-3/4">
            <h3 className="text-lg underline pb-1 mb-1 text-blue-600 font-black">
              Scoreboard
            </h3>
            <p>
              Karthik - <span>200 </span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
            <p>
              Ch - <span>100</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameStats;
