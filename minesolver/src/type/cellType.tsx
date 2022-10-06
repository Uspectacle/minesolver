export interface CellType {
    row: number;
    column: number;
    index: number;
    isShown: Boolean;
    isMine: Boolean;
    isFlag: Boolean;
    prob: number;
    num: number;
    highlight: boolean;
    neighbours: number[];
    fontSize: number;
}
  