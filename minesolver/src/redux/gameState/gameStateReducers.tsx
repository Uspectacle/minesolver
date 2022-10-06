import { GameStateState } from "./gameStateStore";
import { CellType } from "../../type/cellType";

const evolution = 0.01;

const precision = 0.001;
const h = 0.001;

const almostZero = 0.0001
const almostInf = 10000
const acceptableError = 0.0001

const derivative = (f: (x: number) => number) => {
    return (x: number) => ((f(x + h) - f(x - h)) / (2 * h));
}

const newtonsMethod = (
    f: (x: number) => number, 
    guess: number = 1, 
    prevGuess: number = 0,
    numguess: number = 10,
): number => {
    if (Math.abs(prevGuess - guess) > precision && numguess > 0) {
        const d = derivative(f)(guess);
        if (d === 0) return 1;
        const approx = guess - (f(guess) / derivative(f)(guess));
        return newtonsMethod(f, approx < almostZero ? almostZero : approx > almostInf ? almostInf : approx, guess, numguess-1);
    } else {
        return guess;
    }
}

export const getProb = (
  state: GameStateState,
) => {
  if (!state.computeProb) return;
    const oldProb = state.grid.map((cell) => cell.prob);

    state.grid.forEach((cell) => {
        if (!cell.isShown) return;

        const listOfProb = cell.neighbours.map((otherIndex) => {
            const otherCell = state.grid[otherIndex];
            return otherCell.isShown ? 0 : otherCell.prob;
          });

        const equationToSolve = (x: number): number => {
          const sumProb = listOfProb
            .reduce((partialSum, prob) => partialSum + prob**x, 0)
          return sumProb - cell.num;
        }

        const oldError = equationToSolve(1)**2;
        if (oldError > acceptableError) {
          const xOptimal = newtonsMethod(equationToSolve);
  
          const newError = equationToSolve(xOptimal)**2;
          if (newError < oldError) {
            cell.neighbours.forEach((otherIndex) => {
              state.grid[otherIndex].prob = state.grid[otherIndex].prob ** xOptimal;
            })
          } else {console.log("ERROR", cell.num, listOfProb, xOptimal, oldError, newError)}
        }
    })

    const sumProbTotal = (x: number): number => {
        return (state.grid.reduce((partialSum, cell) => {
                if (!cell.isShown) {
                    partialSum += cell.prob ** x;
                }
                return partialSum;
            }, 0) - Math.min(Math.floor(state.mineNum*state.sizeGrid*state.sizeGrid), state.sizeGrid*state.sizeGrid-1)) ;
    }

    const xTotal = newtonsMethod(sumProbTotal);

    state.grid.forEach((cell) => {
        cell.prob = cell.prob ** xTotal;
    });

    if (
      state.grid.reduce((diffPartiel, _, index) => {
            if (state.grid[index].isShown) return diffPartiel;
            return diffPartiel + (state.grid[index].prob - oldProb[index]) ** 2
        }, 0) > evolution ** 2
    ) {
        getProb(state);
    }

    // const digIndex = newGrid.reduce((lowestProbIndex, cell) => {
    //     if (newGrid[lowestProbIndex].isShown) return cell.index;
    //     if (cell.isShown) return lowestProbIndex;
    //     return cell.prob < newGrid[lowestProbIndex].prob ? cell.index : lowestProbIndex
    // }, 0);
}

const initCell = (
  index: number, 
  sizeGrid: number, 
  mineNum: number, 
  computeProb: boolean
): CellType => ({
  row: Math.floor(index / sizeGrid),
  column: index % sizeGrid,
  index,
  isMine: false,
  prob: Math.min(Math.floor(mineNum*sizeGrid*sizeGrid), sizeGrid*sizeGrid-1)/(sizeGrid*sizeGrid),
  num: 0,
  isShown: false,
  isFlag: false,
  highlight: false,
  neighbours: [],
  fontSize: Math.floor(40 / sizeGrid),
});

export const initGrid = (
  sizeGrid: number, 
  mineNum: number, 
  computeProb: boolean
): CellType[] => {
  const preGrid = Array.from(
    {length: sizeGrid * sizeGrid}, 
    (_, index) => initCell(index, sizeGrid, mineNum, computeProb)
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

const setcomputeProb = (
  state: GameStateState,
  value: { payload: boolean; type: string; },
) => {
  state.computeProb = !state.computeProb;
}

const restart = (
  state: GameStateState,
) => {
  state.isMine = false;
  state.isOver = false;
  state.grid = initGrid(state.sizeGrid, state.mineNum, state.computeProb);
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
  
  if (state.grid[index].isShown) return;

  state.grid[index].isFlag = !state.grid[index].isFlag;

  getProb(state);
};

const dig = (
  state: GameStateState,
  value: { payload: number; type: string; },
) => {
  const index = value.payload;

  if (state.isOver) {
      restart(state);
      return;
  }
  
  if (state.grid[index].isFlag) return;
  if (state.grid[index].isShown) return;

  state.grid[index].isShown = true;

  if (!state.isMine) { // INIT MINES
    let indexList = state.grid.map((_, otherIndex) => otherIndex)
      .filter((otherIndex) => otherIndex !== index);

    shuffle(indexList);

    indexList.slice(0, Math.min(Math.floor(state.mineNum*state.sizeGrid*state.sizeGrid), state.sizeGrid*state.sizeGrid-1))
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
      .forEach((otherIndex) => dig(state, {payload: otherIndex, type: value.type}));
  }

  getProb(state);
};

const neighboursCheck = (
  state: GameStateState,
  value: { payload: number; type: string; },
) => {

  if (state.isOver) {
    restart(state);
    return;
  }
  const index = value.payload;

  if (!state.grid[index].isShown) return;

  const neighboursCount = state.grid[index].neighbours
    .reduce((count, otherIndex) => {
      if (state.grid[otherIndex].isFlag) count.flag += 1;
      if (!state.grid[otherIndex].isShown) count.cover += 1;
      return count;
    }, {flag: 0, cover: 0})

  if (neighboursCount.flag === state.grid[index].num) {
    state.grid[index].neighbours
      .forEach((otherIndex) => dig(state, {payload: otherIndex, type: value.type}));
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
  setcomputeProb,
  restart,
  gameOver,
  flag,
  dig,
  highlightNeighbours,
  clearHighlight,
  neighboursCheck,
}