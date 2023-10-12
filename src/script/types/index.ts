export type Matrix2D = Array<number[]>

export enum TetrominoId {
  T = 'T',
  S = 'S',
  L = 'L',
  S_INVERTED = 'T_INVERTED',
  L_INVERTED = 'L_INVERTED',
  SQUARE = 'SQUARE',
  LINE = 'LINE',
}

export interface TetrominoDescriptor {
  id: TetrominoId
  matrix: Matrix2D
}
