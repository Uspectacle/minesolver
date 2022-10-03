import { createStyles } from "@mantine/core";
import React, { useState } from "react";
import { ActionType } from "../type/actionType";
import { CellType } from "../type/cellType";
import { CellDiv } from "./cellDiv";

export const GridDiv = (props: {
  grid: CellType[]
  sizeGrid: number
  action: ActionType
}) => { 
  const { classes } = useStyles(props.sizeGrid);

  return (
    <div className={classes.grid}>
      {props.grid.map((cell, index) => {
          return <CellDiv cell={cell} action={props.action} key={`cell-${index}`}/>
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
    gap: "10px",
    width: "80vmin",
    height: "80vmin",
    aspectRatio: "1",
  },
}));