import numpy as np

SIZE = 10
NMINE = 10

def buidGrid():
    grid = np.zeros((SIZE, SIZE), int)
    mines = np.random.randint(SIZE, size=(2, NMINE))
    grid[mines] = 1
    return grid


def main():
    print(buidGrid())
    return

main()


