import { Input } from './input'
import { DOM } from './dom'
import { Tetromino } from '../entity/tetromino'
import { tetrominoMap } from '../entity/tetromino.data'
import { createMatrix2D, randomIntFromInterval } from '../helpers'
import { config } from '../config'
import { Matrix2D } from '../types'

export class Board {
  public static context: CanvasRenderingContext2D = DOM.boardCanvas.getContext('2d')!
  public static canvas: HTMLCanvasElement = DOM.boardCanvas
  public static currentTetromino: Tetromino = this.getRandomTetromino()
  public static nextTetromino: Tetromino = this.getRandomTetromino()
  public static boardData: Matrix2D = createMatrix2D(config.grid.width, config.grid.height)

  public static get width(): number {
    return this.boardData[0].length
  }

  public static get height(): number {
    return this.boardData.length
  }

  public static init() {
    this.canvas.width = config.block.size * config.grid.width
    this.canvas.height = config.block.size * config.grid.height
    this.context.imageSmoothingEnabled = false
  }

  public static render() {
    this.context.lineWidth = 2
    this.context.fillStyle = '#fcbe24'
    this.context.strokeStyle = '#fcbe24'

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // render board
    for (let y: number = 0; y < config.grid.height; y++) {
      for (let x: number = 0; x < config.grid.width; x++) {
        const cellX = x * config.block.size
        const cellY = y * config.block.size
        if (Board.boardData[y][x]) {
          this.context.fillRect(cellX, cellY, config.block.size, config.block.size)
        } else {
          this.context.strokeRect(cellX, cellY, config.block.size, config.block.size)
        }
      }
    }

    // render current tetromino
    const pivot = Board.currentTetromino.getPivotCoords()

    for (let y = 0; y < Board.currentTetromino.height; y++) {
      for (let x = 0; x < Board.currentTetromino.width; x++) {
        if (!Board.currentTetromino.getBlockData(x, y)) continue
        const cellX = (x + Board.currentTetromino.x) * config.block.size
        const cellY = (y + Board.currentTetromino.y) * config.block.size
        this.context.fillStyle = pivot.x === x && pivot.y === y ? '#faaa20' : '#fcbe24'
        this.context.fillRect(cellX, cellY, config.block.size, config.block.size)
      }
    }

    // render tetromino projection
    const projection = this.currentTetromino.clone()
    while (true) {
      projection.y++
      if (Board.hasCollision(projection)) {
        projection.y--
        break
      }
    }
    for (let y = 0; y < projection.height; y++) {
      for (let x = 0; x < projection.width; x++) {
        if (!projection.getBlockData(x, y)) continue
        const cellX = (x + projection.x) * config.block.size
        const cellY = (y + projection.y) * config.block.size
        this.context.fillStyle = '#fcbe2488'
        this.context.fillRect(cellX, cellY, config.block.size, config.block.size)
      }
    }

    // render tap duration indicator
    if (Input.down.isPressed) {
      const elapsed = Date.now() - Input.tapStart
      if (elapsed > 100) {
        let radius = (elapsed - 100) / 3
        if (radius > 100) radius = 100
        this.context.beginPath()
        this.context.fillStyle = `#fcbe2466`
        this.context.ellipse(100, 400, radius, radius / 2, Math.PI, 0, Math.PI)

        this.context.fill()
      }
    }
  }

  public static reset(): void {
    this.boardData = createMatrix2D(config.grid.width, config.grid.height)
    this.createNewTetromino()
  }

  public static hasBlocksInFirstRow() {
    return this.boardData[0].some(Boolean)
  }

  public static getRandomTetromino(): Tetromino {
    const tetrominoIndex = randomIntFromInterval(0, tetrominoMap.length - 1)
    return new Tetromino(tetrominoMap[tetrominoIndex])
  }

  public static createNewTetromino(): void {
    this.currentTetromino = this.nextTetromino
    this.nextTetromino = this.getRandomTetromino()
  }

  public static getBlockData(x: number, y: number) {
    return this.boardData[y][x]
  }

  public static hasCollision(tetromino: Tetromino = this.currentTetromino): boolean {
    // check collision with borders
    if (tetromino.y + tetromino.height > this.height) return true
    if (tetromino.x < 0) return true
    if (tetromino.x + tetromino.width > this.width) return true
    // check collision between Tetromino and other block already on the board
    for (let offsetY = 0; offsetY < tetromino.height; offsetY++) {
      if (offsetY + this.currentTetromino.y < 0) continue
      for (let offsetX = 0; offsetX < tetromino.width; offsetX++) {
        const boardX = tetromino.x + offsetX
        const boardY = tetromino.y + offsetY
        const boardCell = this.getBlockData(boardX, boardY)
        const tetrominoCell = tetromino.getBlockData(offsetX, offsetY)
        if (tetrominoCell && boardCell) return true
      }
    }
    // no collisions detected!
    return false
  }

  public static fixCurrentTetrominoToBoard(): void {
    // stick piece to map
    for (let offsetY = 0; offsetY < this.currentTetromino.height; offsetY++) {
      for (let offsetX = 0; offsetX < this.currentTetromino.width; offsetX++) {
        if (this.currentTetromino.getBlockData(offsetX, offsetY)) {
          const boardX = this.currentTetromino.x + offsetX
          const boardY = this.currentTetromino.y + offsetY
          this.boardData[boardY][boardX] = 1
        }
      }
    }
  }

  public static processCompletedRows(): number {
    // check if there is any complete row
    let filledRows = 0
    for (let y = 0; y < this.boardData.length; y++) {
      const row = this.boardData[y]
      const fullRowIsFilled: boolean = !row.some((i) => i === 0)
      // if all row is filled, remove it, insert a new row on the top
      if (fullRowIsFilled) {
        filledRows++
        this.boardData.splice(y, 1)
        this.boardData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      }
    }
    return filledRows
  }
}
