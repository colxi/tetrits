import type { Board } from '../controller/board'
import { cloneMatrix2D, createMatrix2D } from '../helpers'
import { Matrix2D, TetrominoDescriptor, TetrominoId } from '../types'

export class Tetromino {
  public constructor(tetromino: TetrominoDescriptor) {
    this.matrix = cloneMatrix2D(tetromino.matrix)
    this.id = tetromino.id
  }

  public x: number = 4
  public y: number = 0
  public matrix: Matrix2D = createMatrix2D(4, 3)
  public id: TetrominoId

  public get width(): number {
    return this.matrix[0].length
  }

  public get height(): number {
    return this.matrix.length
  }

  public getBlockData(x: number, y: number): number {
    return this.matrix[y][x]
  }

  public getPivotCoords(tetrominoData = this.matrix) {
    for (let y = 0; y < tetrominoData.length; y++) {
      for (let x = 0; x < tetrominoData[y].length; x++) {
        if (tetrominoData[y][x] === 2) return { x, y }
      }
    }
    throw new Error('Pivot not found')
  }

  public rotate(board: typeof Board): void {
    // ignore square tetromino rotation request
    if (this.id === TetrominoId.SQUARE) return

    const initialCoords = { x: this.x, y: this.y }
    const initialMatrix = this.matrix
    // apply 90º rotation
    const finalMatrix = initialMatrix[0].map((_, y) => initialMatrix.map((row) => row[y]).reverse())
    // get the difference translate the tetromino position by the difference
    // between the initial pivot and the final pivot in order to obtain
    // rotation over pivot point
    const initialPivotCoords = this.getPivotCoords(initialMatrix)
    const finalPivotCoords = this.getPivotCoords(finalMatrix)
    // update data and position
    this.x += initialPivotCoords.x - finalPivotCoords.x
    this.y += initialPivotCoords.y - finalPivotCoords.y
    this.matrix = finalMatrix

    // revert rotations that exceeds the edges of the board or that generate
    // a collision with the board fixed blocks
    for (let offsetY = 0; offsetY < finalMatrix.length; offsetY++) {
      if (offsetY + this.y < 0) continue
      for (let offsetX = 0; offsetX < finalMatrix[offsetY].length; offsetX++) {
        if (finalMatrix[offsetY][offsetX]) {
          if (
            this.x + offsetX < 0 ||
            this.x + offsetX >= board.width ||
            this.y + offsetY >= board.height ||
            board.getBlockData(offsetX + this.x, offsetY + this.y)
          ) {
            this.matrix = initialMatrix
            this.x = initialCoords.x
            this.y = initialCoords.y
            return
          }
        }
      }
    }
  }

  public clone(): Tetromino {
    const clone = new Tetromino({ matrix: this.matrix, id: this.id })
    clone.x = this.x
    clone.y = this.y
    return clone
  }
}
