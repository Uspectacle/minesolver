import { createStyles } from "@mantine/core";
import { ActionType } from "../type/actionType";
import { CellType } from "../type/cellType";

export const CellDiv = (props: {
  cell: CellType
  action: ActionType
}) => { 
  const { classes } = useStyles();
  
  const cell = props.cell;

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
    props.action.dig(cell.index);
  };

  const rightClick = () => {
    console.log(cell.isShown);

    // if (cell.isShown) return false;
    // props.action.flag(cell.index);
    return false;
  };

  // const mouseHover = () => {
  //   props.action.highlightNeighbours(cell.index);
  // };

  // const mouseOut = () => {
  //   props.action.clearHighlight();
  // };

  return (
    <div 
      className={classes.cell} 
      onClick={leftClick} 
      onContextMenu={rightClick} 
      // onMouseOver={mouseHover} 
      // onMouseOut={mouseOut}
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