import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
    sizeGrid: number;
    mineNum: number;
    enableSolver: boolean;
}

const initialState = {
    sizeGrid: 2,
    mineNum: 1,
    enableSolver: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSizeGrid: (
      state: SettingsState,
      value: { payload: number; type: string; },
    ) => {
      state.sizeGrid = value.payload;
    },
    setMineNum: (
      state: SettingsState,
      value: { payload: number; type: string; },
    ) => {
      state.mineNum = value.payload;
    },
    setEnableSolver: (
      state: SettingsState,
      value: { payload: boolean; type: string; },
    ) => {
      state.enableSolver = value.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
    setSizeGrid,
    setMineNum,
    setEnableSolver,
} = settingsSlice.actions;

export default settingsSlice.reducer;