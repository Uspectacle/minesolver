import { createSlice } from "@reduxjs/toolkit";
import { gameStateReducers } from "./gameStateReducers";
import { CellType } from "../../type/cellType";

export interface GameStateState {
  grid: CellType[];
  isMine: boolean;
  isOver: boolean;
  sizeGrid: number;
  mineNum: number;
  computeProb: boolean;
}

const initialState = {
  grid: [],
  isMine: false,
  isOver: false,
  sizeGrid: 10,
  mineNum: 15/100,
  computeProb: false,
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
  setcomputeProb,
  restart,
  gameOver,
  flag,
  dig,
  highlightNeighbours,
  clearHighlight,
  neighboursCheck,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;