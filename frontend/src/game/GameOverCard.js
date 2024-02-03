import React from "react";

const GameOverCard = (props) => {
 
  return (
    <>
      <div className="absolute bg-slate-900 opacity-75 top-0 bg text-slate-100 h-full w-full border "></div>
      <div className="absolute bg-slate-200 rounded shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 px-20 py-12">
        <h1 className="text-6xl mb-4 font-black font-variety text-bluish">
          Game over
        </h1>
        <div className="p-2 rounded-lg bg-slate-200 text-center m-3 overflow-scroll h-3/4">
          <h3 className="text-lg underline pb-1 mb-1 text-blue-600 font-black">
            Scoreboard
          </h3>
          <div>
            {props.names.map((name, index) => {
              return (
                <p className="font-black">
                  {name} - <span>{props.scores[index]}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOverCard;
