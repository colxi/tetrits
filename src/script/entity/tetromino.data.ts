import { TetrominoDescriptor, TetrominoId } from '../types'

export const tetrominoData: TetrominoDescriptor[] = [
  {
    id: TetrominoId.L,
    data: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    id: TetrominoId.L_INVERTED,
    data: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    id: TetrominoId.SQUARE,
    data: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    id: TetrominoId.T,
    data: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    id: TetrominoId.S,
    data: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    id: TetrominoId.S_INVERTED,
    data: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    id: TetrominoId.LINE,
    data: [[1, 1, 1, 1]],
  },
]
