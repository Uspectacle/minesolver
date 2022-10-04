import { createStyles } from "@mantine/core";
import useGameState from "../hook/useGameState";
import { Cell } from "./Cell";

interface propsType {
  renderGrid: () => void,
}
  
export const Grid = ({
  renderGrid,
}: propsType) => {
  const { sizeGrid, grid } = useGameState();
  const { classes } = useStyles(sizeGrid);

  return (
    <div 
      className={classes.grid}
    >
      {grid.map((cell, index) => {
          return (
            <Cell
              renderGrid={renderGrid}
              cell={cell}
              key={`cell-${index}`}
            />
          )
      })}
    </div>
  )
};

const useStyles = createStyles((theme, sizeGrid: number) => ({
  grid: {
    backgroundColor: "#6A381F",
    padding: "10px",
    margin: "10px",
    display: "grid",
    gridTemplateColumns: `repeat(${sizeGrid}, 1fr)`,
    gap: sizeGrid <= 10 ? `${Math.floor(10/sizeGrid)}vmin` : "1px",
    width: "90vmin",
    height: "90vmin",
    aspectRatio: "1",
  },
}));