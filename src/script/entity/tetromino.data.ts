import { TetrominoDescriptor, TetrominoId } from '../types'

/**
 *
 * 0=> empty slot
 * 1=> block slot
 * 2=> pivot slot (with block)
 *
 */

export const tetrominoMap: TetrominoDescriptor[] = [
  {
    id: TetrominoId.L,
    matrix: [
      [0, 0, 1],
      [1, 2, 1],
    ],
  },
  {
    id: TetrominoId.L_INVERTED,
    matrix: [
      [1, 0, 0],
      [1, 2, 1],
    ],
  },
  {
    id: TetrominoId.SQUARE,
    matrix: [
      [1, 1],
      [2, 1],
    ],
  },
  {
    id: TetrominoId.T,
    matrix: [
      [1, 2, 1],
      [0, 1, 0],
    ],
  },
  {
    id: TetrominoId.S,
    matrix: [
      [0, 1, 1],
      [1, 2, 0],
    ],
  },
  {
    id: TetrominoId.S_INVERTED,
    matrix: [
      [1, 1, 0],
      [0, 2, 1],
    ],
  },
  {
    id: TetrominoId.LINE,
    matrix: [[1, 1, 2, 1]],
  },
]
