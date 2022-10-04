import { CellType } from "../type/cellType";

const initCell = (
  index: number, 
  sizeGrid: number, 
  mineNum: number, 
  useAI: boolean
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
  showProb: useAI,
});
  
export const initGrid = (
  sizeGrid: number, 
  mineNum: number, 
  useAI: boolean
): CellType[] => {
  const preGrid = Array.from(
    {length: sizeGrid * sizeGrid}, 
    (_, index) => initCell(index, sizeGrid, mineNum, useAI)
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