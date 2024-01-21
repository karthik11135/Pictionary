import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import "../styles/board.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import WhiteBoardOptions from "./WhiteBoardOptions";

const Board = (props) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();
  // const canvasParent = useRef();
  const current = {
    color: "white",
    weight: 2,
  };
  const onColorUpdate = (color) => {
    current.color = color;
  };
  const onWeightUpdate = (weight) => {
    current.weight = weight;
  }
  const clearCanvas = () => {
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    // const test = colorsRef.current;
    const context = canvas.getContext("2d");
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = current.weight;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit("draw", [
        {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color,
        },
        props.roomId,
      ]);
    };

    // ---------------- mouse movement --------------------------------------

    const getMouseCoordinates = (e) => {
      const canvas = canvasRef.current;
      const boundingRect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - boundingRect.left;
      const offsetY = e.clientY - boundingRect.top;
      return { x: offsetX, y: offsetY };
    };

    const onMouseDown = (e) => {
      drawing = true;
      const { x, y } = getMouseCoordinates(e);
      current.x = x;
      current.y = y;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      const { x, y } = getMouseCoordinates(e);
      drawLine(current.x, current.y, x, y, current.color, true);
      current.x = x;
      current.y = y;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      const { x, y } = getMouseCoordinates(e);
      drawLine(current.x, current.y, x, y, current.color, true);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    const onResize = () => {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    socketRef.current = io.connect("http://127.0.0.1:5000");
    socketRef.current.emit("create", [props.roomId, props.player]);
    socketRef.current.on("draw", onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div className={props.class}>
      <div className="flex-grow canvas-parent">
        <canvas
          ref={canvasRef}
        />
      </div>

      <div ref={colorsRef} className="flex">
        <WhiteBoardOptions setColor={onColorUpdate} setFontWeight={onWeightUpdate}/>
        <div
          onClick={clearCanvas}
          className="p-2 bg-yellow-200 cursor-pointer ms-auto "
        >
          <RiDeleteBin6Line size="30" />
        </div>
      </div>
    </div>
  );
};

export default Board;
