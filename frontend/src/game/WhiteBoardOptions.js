import { FaCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const WhiteBoardOptions = (props) => {
  return (
    <nav className=" bg-yellow-200">
      <ul className="flex gap-5 p-2">
        <li className="flex gap-2">
          Color
          <ul className="bg-slate-100 rounded flex cursor-pointer">
            <li
              onClick={() => {
                props.setColor("blue");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="blue" size="15" />
            </li>
            <li
              onClick={() => {
                props.setColor("red");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="red" size="15" />
            </li>
            <li
              onClick={() => {
                props.setColor("orange");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="orange" size="15" />
            </li>
            <li
              onClick={() => {
                props.setColor("green");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="green" size="15" />
            </li>
            <li
              onClick={() => {
                props.setColor("pink");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="pink" size="15" />
            </li>
            <li
              onClick={() => {
                props.setColor("black");
              }}
              className="p-1.5 hover:bg-purple-300"
            >
              <FaCircle fill="black" size="15" />
            </li>
          </ul>
        </li>
        <li className="flex gap-2">
          Weight
          <ul className="flex bg-slate-100 rounded cursor-pointer">
            <li
              className="self-stretch p-1.5 hover:bg-purple-300 "
              onClick={() => props.setFontWeight(2)}
            >
              <FaCircle fill="black" size="4" className="text-center" />
            </li>
            <li
              className="self-stretch   p-1.5 hover:bg-purple-300"
              onClick={() => props.setFontWeight(4)}
            >
              <FaCircle fill="black" size="8" />
            </li>
            <li
              className="self-stretch p-1.5 hover:bg-purple-300"
              onClick={() => props.setFontWeight(6)}
            >
              <FaCircle fill="black" size="10" />
            </li>
            <li
              className="self-stretch p-1.5 hover:bg-purple-300"
              onClick={() => props.setFontWeight(8)}
            >
              <FaCircle fill="black" size="15" />
            </li>
          </ul>
        </li>
        <li
          onClick={() => {
            props.whiteBoard.current.clearCanvas();
          }}
          className="ms-auto self-stretch cursor-pointer"
        >
          <RiDeleteBin6Line size="30" />
        </li>
      </ul>
    </nav>
  );
};

export default WhiteBoardOptions;
