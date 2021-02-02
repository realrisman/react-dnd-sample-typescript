import React from "react";
import Knight from "./Knight";
import Square from "./Square";
import { moveKnight } from "./game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const handleSqareClick = (toX: number, toY: number) => {
  moveKnight(toX, toY);
};

const renderSquare = (i: number, [knightX, knightY]: [number, number]) => {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const black = (x + y) % 2 === 1;
  const isKnightHere = x === knightX && y === knightY;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div
      key={i}
      style={{ width: "12.5%", height: "12.5%" }}
      onClick={() => handleSqareClick(x, y)}
    >
      <Square black={black}>{piece}</Square>
    </div>
  );
};

type BoardProps = {
  knightPosition: [number, number];
};

const Board: React.FC<BoardProps> = (props) => {
  const { knightPosition } = props;
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
};

export default Board;
