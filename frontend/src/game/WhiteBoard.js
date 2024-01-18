import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import WhiteBoardOptions from "./WhiteBoardOptions";
import { useState, useRef, useEffect } from "react";
import _ from "lodash";
import LZString from "lz-string";
import { io } from "socket.io-client";

const styles = {
  border: "0.0625rem solid #23da11",
  borderRadius: "0.25rem",
};

const WhiteBoard = (props) => {
  const [color, setColor] = useState("black");
  const [fontWeight, setFontWeight] = useState(4);
  const whiteBoard = useRef();
  const socket = io("http://127.0.0.1:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
    });
    socket.emit("create", 'karthik');

    socket.on("draw", (data) => {
      whiteBoard.current.loadPaths(data);
    });
    return () => {
      socket.off("draw");
    };
  }, [socket]);

  const saveHandler = () => {
    const pic = whiteBoard.current.exportPaths().then((data) => {
      socket.emit("draw", [data, 'karthik']);
    });
  }

  return (
    <div className={props.class}>
      <ReactSketchCanvas
        ref={whiteBoard}
        style={styles}
        onStroke={saveHandler}
        strokeWidth={fontWeight}
        strokeColor={color}
        canvasColor="white"
        className="flex-grow"
      />
      <WhiteBoardOptions
        setColor={setColor}
        setFontWeight={setFontWeight}
        whiteBoard={whiteBoard}
      />
      {/* <button className="text-slate-50" onClick={saveHandler}>send</button> */}
    </div>
  );
};

export default WhiteBoard;
