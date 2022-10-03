import { CellType } from '../type/cellType';
import { GridDiv } from '../component/gridDiv';
import React, { useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import { ActionType } from '../type/actionType';
import { algoAI } from '../component/algoAI';


console.log("Hello");


// const shuffle = (anyArray: number[]) => {
//   for (let i = anyArray.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [anyArray[i], anyArray[j]] = [anyArray[j], anyArray[i]];
//   }
// }

const App = () => {};

// const App = () => {
//   const { classes } = useStyles();
//   const sizeGrid = 20;
//   const mineNum = 50;
//   const useAI = true;

//   const initCell = (index: number, sizeGrid: number): CellType => ({
//     row: Math.floor(index / sizeGrid),
//     column: index % sizeGrid,
//     index,
//     isMine: false,
//     prob: Math.min(mineNum, sizeGrid*sizeGrid-1)/(sizeGrid*sizeGrid),
//     num: 0,
//     isShown: false,
//     isFlag: false,
//     highlight: false,
//     neighbours: [],
//     fontSize: Math.floor(40 / sizeGrid),
//     showProb: useAI,
//   });

//   const initGrid = (): CellType[] => {
//     const preGrid = Array.from(
//       {length: sizeGrid * sizeGrid}, 
//       (_, index) => initCell(index, sizeGrid)
//     );
//     return preGrid.map((cell) => {
//       const neighbouringCells = preGrid.filter((otherCell) => {
//         return (
//           Math.abs(cell.column - otherCell.column) < 2 && 
//           Math.abs(cell.row - otherCell.row) < 2
//         )
//       });
//       cell.neighbours = neighbouringCells.map((cell) => cell.index);
//       return cell;
//     });
//   };

//   const [isOver, setIsOver] = useState(false);
//   const [grid, setGrid] = useState(initGrid());
//   const [isMinesInit, setIsMinesInit] = useState(false);

//   const restart = () => {
//     setIsMinesInit(false);
//     setIsOver(false);
//     setGrid(initGrid());
//   }

//   const gameOver = () => {
//     var newGrid = grid.map((cell) => {
//       if (!cell.isFlag || cell.isMine) cell.isShown = true;
//       return cell;
//     })
//     setIsOver(true);
//     setGrid(newGrid);
//   }

//   useEffect(restart, [])
 
//   const flag = (index: number) => {
//     if (isOver) {
//       restart();
//       return;
//     }
//     var newGrid = [...grid]
//     newGrid[index].isFlag = !newGrid[index].isFlag;
//     setGrid(newGrid);

//     console.log('but meh', !newGrid.some((cell) => {
//       return (!cell.isShown && !cell.isMine)
//     }))

//     if (!newGrid.some((cell) => {
//       return (!cell.isShown && !cell.isMine)
//     })) {
//       var completedGrid = newGrid.map((cell) => {
//         if (!cell.isFlag || cell.isMine) cell.isFlag = true;
//         return cell;
//       })
//       setGrid(completedGrid);
//     }

//     if (!newGrid.some((cell) => {
//       return (cell.isFlag && !cell.isMine) || (!cell.isFlag && cell.isMine)
//     })) {
//       gameOver(); 
//       return;
//     }
//   };

//   const initMines = (newGrid: CellType[], clearIndex: number) => {
//     let indexList = newGrid.map((_, index) => index)
//       .filter((index) => index != clearIndex);
//     shuffle(indexList);
//     indexList.slice(0, Math.min(mineNum, sizeGrid*sizeGrid-1))
//       .forEach((index) => {newGrid[index].isMine = true;})

//     newGrid = newGrid.map((cell) => {
//       cell.neighbours.forEach((index) => {
//         if (newGrid[index].isMine) cell.num += 1;
//       })
//       return cell;
//     })

//     setIsMinesInit(true);
//   };

//   const dig = (index: number, neighbours: boolean = false) => {
//     if (isOver) {
//         restart();
//         return;
//     }
//     if (grid[index].isFlag) return;
//     if (grid[index].isShown) {
//       if (!neighbours) {
//         const neighboursCount = grid[index].neighbours
//           .reduce((count, otherIndex) => {
//             if (grid[otherIndex].isFlag) count.flag += 1;
//             if (!grid[otherIndex].isShown) count.cover += 1;
//             return count;
//           }, {flag: 0, cover: 0})
//         if (neighboursCount.flag == grid[index].num) {
//           grid[index].neighbours
//             .forEach((otherIndex) => dig(otherIndex, true));
//         }
//         if (neighboursCount.cover == grid[index].num) {
//           grid[index].neighbours
//             .forEach((otherIndex) => {
//               if (!grid[otherIndex].isShown && !grid[otherIndex].isFlag) {
//                 flag(otherIndex)
//               }
//             });
//         }
//       }
//       return;
//     };

//     var newGrid = [...grid];
//     newGrid[index].isShown = true;

//     if (!isMinesInit) {
//       if (newGrid.some((cell) => cell.isMine)) {
//         newGrid = initGrid();
//         newGrid[index].isShown = true;
//       }
//       initMines(newGrid, index);
//     }

//     setGrid(newGrid);

//     if (grid[index].isMine || !grid.some((cell) => {
//       return (cell.isFlag && !cell.isMine) || (!cell.isFlag && cell.isMine)
//     })) {
//       gameOver();
//       return;
//     }
    
//     if (grid[index].num == 0) {
//       grid[index].neighbours
//         .forEach((otherIndex) => dig(otherIndex, true));
//     }
//   };

//   const highlightNeighbours = (index: number) => {
//     var newGrid = [...grid];
//     newGrid[index].neighbours.forEach((index) => {
//       newGrid[index].highlight = true;
//     })
//     setGrid(newGrid);
//   };

//   const clearHighlight = () => {
//     var newGrid = [...grid];
//     newGrid.forEach((cell) => {
//       cell.highlight = false;
//     })
//     setGrid(newGrid);
//   }

//   const action: ActionType = {
//     flag, 
//     dig,
//     highlightNeighbours,
//     clearHighlight,
//   };

//   useEffect(() => {
//     if (!useAI || isOver) return;
//     const interval = setInterval(() => {
//       setGrid(algoAI(grid, action, Math.min(mineNum, sizeGrid*sizeGrid-1)))
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [grid, action]);

//   return (
//     <div className={classes.background}>
//       <GridDiv grid={grid} sizeGrid={sizeGrid} action={action} />
//     </div>
//   );
// };

// const useStyles = createStyles((theme) => ({
//   background: {
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: '#6A381F',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     justifyContent: "space-around",
//     alignItems: "center",
//     minHeight: "100%",
//     height: "100vh",
//   },
// }));

export default App