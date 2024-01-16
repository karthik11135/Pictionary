import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import WhiteBoardOptions from "./WhiteBoardOptions";
import { useState, useRef } from "react";

const styles = {
  border: "0.0625rem solid #23da11",
  borderRadius: "0.25rem",
};

const WhiteBoard = (props) => {
  const [color, setColor] = useState("black");
  const [fontWeight, setFontWeight] = useState(4);
  const whiteBoard = useRef();
  return (
    <div className={props.class}>
      <ReactSketchCanvas
        ref={whiteBoard}
        style={styles}
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
    </div>
  );
};

export default WhiteBoard;
