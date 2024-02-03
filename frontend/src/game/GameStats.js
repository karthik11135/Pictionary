import React, { useEffect } from "react";
import { useState, useRef } from "react";
import GameOverCard from "./GameOverCard";
import useInterval from "../hooks/useInterval";

const GameStats = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [counter, setCounter] = useState(5);
  const [randomWord, setRandomWord] = useState("*****");
  const [names, setNames] = useState([])
  const [scores, setScores] = useState([])

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

    props.socket.on("game_finished", (data) => {
      console.log(data)
      setNames(data.player_names)
      setScores(data.player_scores)
      setGameFinished(true);
    });

    return () => {
      props.socket.off("game_player");
      props.socket.off("game_started");
      props.socket.off("game-continues");
      props.socket.off("game_finished");
    };
  }, [props.socket, counter]);

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
        <h2 className="font-black font-variety p-2 text-center text-lg m-2 rounded-md text-bluish">{randomWord}</h2>
      )}
      {gameFinished && <GameOverCard names={names} scores={scores}/>}
    </div>
  );
};

export default GameStats;
