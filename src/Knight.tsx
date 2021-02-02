import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

const Knight: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging,
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 50,
        fontWeight: "bold",
        cursor: "move",
        textAlign: "center",
      }}
    >
      ♘
    </div>
  );
};

export default Knight;
