import { ActionType } from "./type/actionType"
import { CellType } from "./type/cellType"

const evolution = 0.01;

const precision = 0.001;
const h = 0.001;

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
        return newtonsMethod(f, approx > 0 ? approx < 1000 ? approx : 1000 : 0, guess, numguess-1);
    } else {
        return guess;
    }
}

export const algoAI = (
    grid: CellType[], 
    action: ActionType, 
    mineNum: number,
): CellType[] => {
    var newGrid = [...grid];

    grid.forEach((cell) => {
        if (!cell.isShown || cell.isFlag) return;

        const sumProb = (x: number): number => {
            return (grid[cell.index].neighbours
                .reduce((partialSum, otherIndex) => {
                    if (!grid[otherIndex].isShown) {
                        partialSum += grid[otherIndex].prob ** x;
                    }
                    return partialSum;
                }, 0) - grid[cell.index].num) ;
        }
        const x = newtonsMethod(sumProb);
        grid[cell.index].neighbours.forEach((otherIndex) => {
            newGrid[otherIndex].prob = newGrid[otherIndex].prob ** x;
        })
    })

    const sumProbTotal = (x: number): number => {
        return (newGrid.reduce((partialSum, cell) => {
                if (!cell.isShown) {
                    partialSum += cell.prob ** x;
                }
                return partialSum;
            }, 0) - mineNum) ;
    }

    const xTotal = newtonsMethod(sumProbTotal);

    newGrid.forEach((cell) => {
        cell.prob = cell.prob ** xTotal;
    });

    if (
        grid.reduce((diffPartiel, _, index) => {
            if (newGrid[index].isShown) return diffPartiel;
            return diffPartiel + (newGrid[index].prob - grid[index].prob) ** 2
        }, 0) > evolution ** 2
    ) {
        return algoAI(newGrid, action, mineNum);
    }

    const digIndex = newGrid.reduce((lowestProbIndex, cell) => {
        if (newGrid[lowestProbIndex].isShown) return cell.index;
        if (cell.isShown) return lowestProbIndex;
        return cell.prob < newGrid[lowestProbIndex].prob ? cell.index : lowestProbIndex
    }, 0);

    action.dig(digIndex);

    return newGrid;
}