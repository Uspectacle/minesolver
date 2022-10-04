import { createSlice } from "@reduxjs/toolkit";
import { gameStateReducers } from "./gameStateReducers";
import { CellType } from "../../type/cellType";

export interface GameStateState {
  grid: CellType[];
  isMine: boolean;
  isOver: boolean;
  sizeGrid: number;
  mineNum: number;
  enableSolver: boolean;
}

const initialState = {
  grid: [],
  isMine: false,
  isOver: false,
  sizeGrid: 5,
  mineNum: 3,
  enableSolver: false,
};


export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: gameStateReducers
});

// Action creators are generated for each case reducer function
export const {
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
} = gameStateSlice.actions;

export default gameStateSlice.reducer;