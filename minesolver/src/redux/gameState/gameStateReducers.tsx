import { GameStateState } from "./gameStateStore";
import { CellType } from "../../type/cellType";

const initCell = (
  index: number, 
  sizeGrid: number, 
  mineNum: number, 
  enableSolver: boolean
): CellType => ({
  row: Math.floor(index / sizeGrid),
  column: index % sizeGrid,
  index,
  isMine: false,
  prob: Math.min(mineNum, sizeGrid*sizeGrid-1)/(sizeGrid*sizeGrid),
  num: 0,
  isShown: false,
  isFlag: false,
  highlight: false,
  neighbours: [],
  fontSize: Math.floor(40 / sizeGrid),
  showProb: enableSolver,
});

export const initGrid = (
  sizeGrid: number, 
  mineNum: number, 
  enableSolver: boolean
): CellType[] => {
  const preGrid = Array.from(
    {length: sizeGrid * sizeGrid}, 
    (_, index) => initCell(index, sizeGrid, mineNum, enableSolver)
  );
  return preGrid.map((cell) => {
    const neighbouringCells = preGrid.filter((otherCell) => {
      return (
        Math.abs(cell.column - otherCell.column) < 2 && 
        Math.abs(cell.row - otherCell.row) < 2
      )
    });
    cell.neighbours = neighbouringCells.map((cell) => cell.index);
    return cell;
  });
};

const shuffle = (anyArray: number[]) => {
    for (let i = anyArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [anyArray[i], anyArray[j]] = [anyArray[j], anyArray[i]];
    }
}

const setGrid = (
  state: GameStateState,
  value: { payload: CellType[]; type: string; },
) => {
  state.grid = value.payload;
};

const setIsMine = (
  state: GameStateState,
  value: { payload: boolean; type: string; },
) => {
  state.isMine = value.payload;
};

const setIsOver = (
  state: GameStateState,
  value: { payload: boolean; type: string; },
) => {
  state.isOver = value.payload;
};

const setSizeGrid =(
  state: GameStateState,
  value: { payload: number; type: string; },
) => {
  state.sizeGrid = value.payload;
}

const setMineNum = (
  state: GameStateState,
  value: { payload: number; type: string; },
) => {
  state.mineNum = value.payload;
}

const setEnableSolver = (
  state: GameStateState,
  value: { payload: boolean; type: string; },
) => {
  state.enableSolver = value.payload;
}

const restart = (
  state: GameStateState,
) => {
  state.isMine = false;
  state.isOver = false;
  state.grid = initGrid(state.sizeGrid, state.mineNum, state.enableSolver);
};

const gameOver = (
  state: GameStateState
)=> {
  state.isOver = true;
  state.grid.forEach((cell) => {
    if (!cell.isFlag || cell.isMine) cell.isShown = true;
  });
}

const flag = (
  state: GameStateState,
  value: { payload: number; type: string; },
) => {

  if (state.isOver) {
    restart(state);
    return;
  }

  const index = value.payload;

  state.grid[index].isFlag = !state.grid[index].isFlag;
};

const dig = (
  state: GameStateState,
  value: { 
    payload: {
      index: number,
      neighbours: boolean,
    }; 
    type: string; 
  },
) => {
  const {index, neighbours} = value.payload;

  if (state.isOver && !neighbours) {
      restart(state);
      return;
  }
  
  if (state.grid[index].isFlag) return;

  if (state.grid[index].isShown) {
    if (!neighbours) {

      const neighboursCount = state.grid[index].neighbours
        .reduce((count, otherIndex) => {
          if (state.grid[otherIndex].isFlag) count.flag += 1;
          if (!state.grid[otherIndex].isShown) count.cover += 1;
          return count;
        }, {flag: 0, cover: 0})

      if (neighboursCount.flag === state.grid[index].num) {
        state.grid[index].neighbours
          .forEach((otherIndex) => dig(state, {payload: {index: otherIndex, neighbours: true}, type: value.type}));
      }

      if (neighboursCount.cover === state.grid[index].num) {
        state.grid[index].neighbours
          .forEach((otherIndex) => {
            if (!state.grid[otherIndex].isShown && !state.grid[otherIndex].isFlag) {
              flag(state, {payload: otherIndex, type: value.type});
            }
          });
      }
    }
    return;
  };

  state.grid[index].isShown = true;

  if (!state.isMine) { // INIT MINES
    let indexList = state.grid.map((_, otherIndex) => otherIndex)
      .filter((otherIndex) => otherIndex !== index);

    shuffle(indexList);

    indexList.slice(0, Math.min(state.mineNum, state.sizeGrid*state.sizeGrid-1))
      .forEach((otherIndex) => {state.grid[otherIndex].isMine = true;})

    state.grid = state.grid.map((cell) => {
      cell.neighbours.forEach((otherIndex) => {
        if (state.grid[otherIndex].isMine) cell.num += 1;
      })
      return cell;
    })

    state.isMine = true;
  }

  if (state.grid[index].isMine) {
    gameOver(state); // LOOSE
    return;
  }


  if (state.grid.every((cell) => {
    return (cell.isShown && !cell.isMine) || (!cell.isShown && cell.isMine)
  })) {
    state.grid.forEach((cell) => {
      if (!cell.isFlag && cell.isMine) cell.isFlag = true;
    })
    gameOver(state); // WIN
    return;
  }
  
  if (state.grid[index].num === 0) {
    state.grid[index].neighbours
      .forEach((otherIndex) => dig(state, {payload: {index: otherIndex, neighbours: true}, type: value.type}));
  }
};

const highlightNeighbours = (
  state: GameStateState,
  value: { payload: number; type: string; },
) => {
  const index = value.payload;
  state.grid[index].neighbours.forEach((otherIndex) => {
    state.grid[otherIndex].highlight = true;
  });
};

const clearHighlight = (
  state: GameStateState,
) => {
  state.grid.forEach((cell) => {
    cell.highlight = false;
  })
}

export const gameStateReducers = {
  setGrid,
  setIsMine,
  setIsOver,
  setSizeGrid,
  setMineNum,
  setEnableSolver,
  restart,
  gameOver,
  flag,
  dig,
  highlightNeighbours,
  clearHighlight,
}