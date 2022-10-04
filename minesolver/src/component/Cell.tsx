import { createStyles } from "@mantine/core";
import { CellType } from "../type/cellType";
import { MouseEventHandler } from 'react';
import { useDispatch } from "react-redux";
import { clearHighlight, dig, flag, highlightNeighbours } from "../redux/gameState/gameStateStore";

interface propsType {
  renderGrid: () => void,
  cell: CellType,
}
  
export const Cell = ({
  renderGrid,
  cell,
}: propsType) => {
  
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const color = (
    !cell.isShown ? "#DCAB6B" : 
    cell.isMine ? "#6e0d25" : 
    cell.num === 0 ? "#6A381F" :
    [ "#6A381F",
      "#6E3E20", 
      "#704121", 
      "#754B23", 
      "#774E24", 
      "#754124", 
      "#733424", 
      "#722725",
      "#701A25", 
      "#6E0D25",
    ][cell.num] || "#774E24"
  );

  const fontColor = (cell.isShown ? [
    "#6A381F", 
    "#1d32d6", 
    "#0eac58",  
    "#b8880f", 
    "#192899", 
    "#bc3838", 
    "#2f9cab", 
    "#000000",
    "#5e5e5e", 
    "#ffffff",
  ][cell.num] || "#000000" : "#000000");

  const brightness = (
    !cell.highlight ? 100 : 
    !cell.isShown ? 90 : 
    cell.num === 0 ? 100 : 
    95
  );

  const image = (
    cell.isFlag ? "🚩" : 
    !cell.isShown ? (cell.showProb ? `${Math.floor(cell.prob*100)}%` : "") :
    cell.isMine ? "💣" : 
    String(cell.num)
  );


  const leftClick = () => {
    if (cell.isFlag) return;
    dispatch(dig({index: cell.index, neighbours: false}));
    renderGrid();
  };
  
  const rightClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (cell.isShown) return false;
    dispatch(flag(cell.index));
    renderGrid();
    return false;
  };

  const mouseHover = () => {
    dispatch(highlightNeighbours(cell.index));
    renderGrid();
  };

  const mouseOut = () => {
    dispatch(clearHighlight());
    renderGrid();
  };

  return (
    <div 
      className={classes.cell} 
      onClick={leftClick} 
      onContextMenu={rightClick} 
      onMouseOver={mouseHover} 
      onMouseOut={mouseOut}
      style={{backgroundColor: color, filter: `brightness(${brightness}%)`, color: fontColor, fontSize: `${cell.showProb && !cell.isShown? Math.floor(cell.fontSize/2) : cell.fontSize}vmin`}}>
        {image}
    </div>
  )
};

// https://coolors.co/6e0d25-ffffb3-dcab6b-774e24-6a381f

const useStyles = createStyles((theme) => ({
  cell: {
    aspectRatio: "1",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
	  fontWeight: "bold",
    userSelect: "none",
    // fontFamily: 'Bowlby One SC',
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    height: "100%",
  },
}));