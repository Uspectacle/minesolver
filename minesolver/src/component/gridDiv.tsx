import { createStyles } from "@mantine/core";
import { ActionType } from "../type/actionType";
import { CellType } from "../type/cellType";
import { CellDiv } from "./cellDiv";

// const shuffle = (anyArray: number[]) => {
//   for (let i = anyArray.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [anyArray[i], anyArray[j]] = [anyArray[j], anyArray[i]];
//   }
// }

export const GridDiv = (props: {
  grid: CellType[]
  sizeGrid: number
  mineNum: number
  renderGrid: (grid: CellType[]) => void
}) => { 
  const { classes } = useStyles(props.sizeGrid);

  // const [isOver, setIsOver] = useState(false);
  // const [grid, setGrid] = useState(initGrid());
  // const [isMinesInit, setIsMinesInit] = useState(false);

  // const restart = () => {
  //   setIsMinesInit(false);
  //   setIsOver(false);
  //   setGrid(initGrid());
  // }

  // const gameOver = () => {
  //   var newGrid = grid.map((cell) => {
  //     if (!cell.isFlag || cell.isMine) cell.isShown = true;
  //     return cell;
  //   })
  //   setIsOver(true);
  //   setGrid(newGrid);
  // }

  // useEffect(restart)
 
  // const flag = (index: number) => {
  //   if (isOver) {
  //     restart();
  //     return;
  //   }
  //   var newGrid = [...grid]
  //   newGrid[index].isFlag = !newGrid[index].isFlag;
  //   setGrid(newGrid);

  //   console.log('but meh', !newGrid.some((cell) => {
  //     return (!cell.isShown && !cell.isMine)
  //   }))

  //   if (!newGrid.some((cell) => {
  //     return (!cell.isShown && !cell.isMine)
  //   })) {
  //     var completedGrid = newGrid.map((cell) => {
  //       if (!cell.isFlag || cell.isMine) cell.isFlag = true;
  //       return cell;
  //     })
  //     setGrid(completedGrid);
  //   }

  //   if (!newGrid.some((cell) => {
  //     return (cell.isFlag && !cell.isMine) || (!cell.isFlag && cell.isMine)
  //   })) {
  //     gameOver(); 
  //     return;
  //   }
  // };

  // const initMines = (newGrid: CellType[], clearIndex: number) => {
  //   let indexList = newGrid.map((_, index) => index)
  //     .filter((index) => index !== clearIndex);
  //   shuffle(indexList);
  //   indexList.slice(0, Math.min(mineNum, sizeGrid*sizeGrid-1))
  //     .forEach((index) => {newGrid[index].isMine = true;})

  //   newGrid = newGrid.map((cell) => {
  //     cell.neighbours.forEach((index) => {
  //       if (newGrid[index].isMine) cell.num += 1;
  //     })
  //     return cell;
  //   })

  //   setIsMinesInit(true);
  // };

  const dig = (index: number, neighbours: boolean = false) => {
    // if (isOver) {
    //     restart();
    //     return;
    // }
    // if (grid[index].isFlag) return;
    // if (grid[index].isShown) {
      // if (!neighbours) {
      //   const neighboursCount = grid[index].neighbours
      //     .reduce((count, otherIndex) => {
      //       if (grid[otherIndex].isFlag) count.flag += 1;
      //       if (!grid[otherIndex].isShown) count.cover += 1;
      //       return count;
      //     }, {flag: 0, cover: 0})
      //   if (neighboursCount.flag === grid[index].num) {
      //     grid[index].neighbours
      //       .forEach((otherIndex) => dig(otherIndex, true));
      //   }
      //   if (neighboursCount.cover === grid[index].num) {
      //     grid[index].neighbours
      //       .forEach((otherIndex) => {
      //         if (!grid[otherIndex].isShown && !grid[otherIndex].isFlag) {
      //           flag(otherIndex)
      //         }
      //       });
      //   }
      // }
    //   return;
    // };

    props.grid[index].isShown = true;
    props.renderGrid(props.grid);

    // if (!isMinesInit) {
    //   if (newGrid.some((cell) => cell.isMine)) {
    //     newGrid = initGrid();
    //     newGrid[index].isShown = true;
    //   }
    //   initMines(newGrid, index);
    // }

    // setGrid(newGrid);

    // if (grid[index].isMine || !grid.some((cell) => {
    //   return (cell.isFlag && !cell.isMine) || (!cell.isFlag && cell.isMine)
    // })) {
    //   gameOver();
    //   return;
    // }
    
    // if (grid[index].num === 0) {
    //   grid[index].neighbours
    //     .forEach((otherIndex) => dig(otherIndex, true));
    // }
  };

  // const highlightNeighbours = (index: number) => {
  //   var newGrid = [...grid];
  //   newGrid[index].neighbours.forEach((index) => {
  //     newGrid[index].highlight = true;
  //   })
  //   setGrid(newGrid);
  // };

  // const clearHighlight = () => {
  //   var newGrid = [...grid];
  //   newGrid.forEach((cell) => {
  //     cell.highlight = false;
  //   })
  //   setGrid(newGrid);
  // }

  const action: ActionType = {
    // flag, 
    dig,
    // highlightNeighbours,
    // clearHighlight,
  };

  // useEffect(() => {
  //   if (!useAI || isOver) return;
  //   const interval = setInterval(() => {
  //     setGrid(algoAI(grid, action, Math.min(mineNum, sizeGrid*sizeGrid-1)))
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [grid, useAI, isOver]);()



  return (
    <div 
      className={classes.grid}
    >
      {props.grid.map((cell, index) => {
          return (
            <CellDiv 
              cell={cell} 
              action={action} 
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
    gap: "10px",
    width: "80vmin",
    height: "80vmin",
    aspectRatio: "1",
  },
}));