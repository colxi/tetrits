import type { Board } from '../controller/board'
import { cloneMatrix2D, createMatrix2D } from '../helpers'
import { Matrix2D, TetrominoDescriptor, TetrominoId } from '../types'

export class Tetromino {
  public constructor(tetrominoData: TetrominoDescriptor) {
    this.data = cloneMatrix2D(tetrominoData.data)
    this.id = tetrominoData.id
  }

  public x: number = 4
  public y: number = 0
  public data: Matrix2D = createMatrix2D(4, 3)
  public id: TetrominoId

  public get width(): number {
    return this.data[0].length
  }

  public get height(): number {
    return this.data.length
  }

  public getBlockData(x: number, y: number): number {
    return this.data[y][x]
  }

  public rotate(board: typeof Board): void {
    const data = this.data[0].map((_, y) => this.data.map((row) => row[y]).reverse())
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        // prevent rotations that exeed the edges of the board
        if (this.x + x >= board.width) return
        if (this.y + y >= board.height) return
        // prevent rotations that generate a collision with the board
        // fixed blocks
        if (data[y][x] && board.boardData[this.y + y][this.x + x]) return
      }
    }
    this.data = data
  }

  public clone(): Tetromino {
    const clone = new Tetromino({ data: this.data, id: this.id })
    clone.x = this.x
    clone.y = this.y
    return clone
  }
}
