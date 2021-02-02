import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import { canMoveKnight, moveKnight } from "./game";
import Overlay from "./Overlay";
import Square from "./Square";

type BoardSquareProps = {
  x: number;
  y: number;
};

const BoardSquare: React.FC<BoardSquareProps> = (props) => {
  const { x, y, children } = props;
  const black = (x + y) % 2 === 1;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    canDrop: () => canMoveKnight(x, y),
    drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
};

export default BoardSquare;
