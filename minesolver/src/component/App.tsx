import { createStyles } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { GridDiv } from './gridDiv';
import { initGrid } from './initGrid';
import { CellType } from '../type/cellType';

interface propsAppType {
  grid: CellType[];
  sizeGrid: number;
  useAI: boolean,
  mineNum: number;
  renderGrid: (grid: CellType[]) => void;
}

export const App = ({
  grid,
  sizeGrid,
  mineNum,
  useAI,
  renderGrid,
}: propsAppType) => {

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 's' || event.key === 'S'){
      renderGrid(initGrid(sizeGrid, mineNum, useAI));
    }
  }

  const { classes } = useStyles();
  return (
    <div  
      className={classes.background} 
      id="appRoot"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
    <GridDiv 
      grid={grid} 
      sizeGrid={sizeGrid} 
      mineNum={mineNum} 
      renderGrid={renderGrid} 
    />
    </div >
  )
}

const useStyles = createStyles((theme) => ({
  background: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#6A381F',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "100%",
    height: "100vh",
    "& > span" : {
      color: '#b38c78',
      fontSize: "30px",
    }
  },
}));















// import { CellType } from './type/cellType';
// import { GridDiv } from './gridDiv';
// import { createStyles } from '@mantine/core';
// import ReactDOM from 'react-dom/client';
// import { KeyboardEvent } from 'react';
// import React from 'react';

// const App = () => {
//   const { classes } = useStyles();
//   const sizeGrid = 2;
//   const mineNum = 1;
//   const useAI = false;

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

//   const renderGrid = (grid: CellType[]) => {
//     const root = ReactDOM.createRoot(
//       document.getElementById('root') as HTMLElement
//     );
//     root.render(
//       <React.StrictMode>
//         <div  
//           className={classes.background} 
//           id="appRoot"
//           onKeyDown={handleKeyPress}
//           tabIndex={0}
//         >
//         <GridDiv 
//           grid={grid} 
//           sizeGrid={sizeGrid} 
//           mineNum={mineNum} 
//           renderGrid={renderGrid} 
//         />
//         </div >
//       </React.StrictMode>
//     )
//   };

//   const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
//     if(event.key === 's' || event.key === 'S'){
//       renderGrid(initGrid());
//     }
//   }

//   return (
//     <div  
//       className={classes.background} 
//       id="appRoot"
//       onKeyDown={handleKeyPress}
//       tabIndex={0}
//     >
//       {/* Press Space to Open/Close this Menu <br /> */}
//       <span>Press the <strong>S</strong> key to Start / Restart</span>
//     </div >
//   )
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
//     "& > span" : {
//       color: '#b38c78',
//       fontSize: "30px",
//     }
//   },
// }));

// export default App