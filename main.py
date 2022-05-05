# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import numpy
import numpy as np

SIZE = 10
NUM_MINE = 10
MINE = 9
SEED = np.random.randint(SIZE*SIZE)

def inside(line, column):
    return 0 <= line < SIZE and 0 <= column < SIZE


def index_to_tuple(index):
    return index // SIZE, index % SIZE


def tuple_to_index(line, column):
    return line * SIZE + column

def neighbour(line, column):
    may = [(line - 1, column - 1),
           (line - 1, column),
           (line - 1, column + 1),
           (line, column - 1),
           (line, column + 1),
           (line + 1, column - 1),
           (line + 1, column),
           (line + 1, column + 1)]
    out = [[], []]
    for l, c in may:
        if inside(l, c):
            out[0].append(l)
            out[1].append(c)
    return out

def auto_view()

def build_grid(seed=SEED):
    grid = np.zeros((SIZE, SIZE), int)
    choose = [(index // SIZE, index % SIZE) for index in range(SIZE*SIZE) if index not in
    while True:

        mines = np.random.choice(SIZE*SIZE, size=NUM_MINE, replace=False)
        if seed not in mines:
            break
    for mine in mines:
        grid[tuple(neighbour(mine // SIZE, mine % SIZE))] += 1
    for mine in mines:
        grid[mine // SIZE, mine % SIZE] = MINE
    view = numpy.zeros_like(GRID, dtype=bool)
    auto_view = [(seed // SIZE, seed % SIZE)]
    view[seed // SIZE, seed % SIZE] = True
    return grid, view


GRID, VIEW = build_grid()
VIEW = numpy.zeros_like(GRID, dtype=bool)
VIEW = SEED

def main():

    return


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()
