import { config } from '../config'
import { Board } from '../controller/board'
import { Game } from '../controller/game'
import { Input } from '../controller/input'

let lastTetrominoFallTimestamp = 0
export function handleTetrominoFall(delta: number) {
  const ellapsed = delta - lastTetrominoFallTimestamp
  if (ellapsed > 1500 - Game.speed * config.speedMultiplier) {
    lastTetrominoFallTimestamp = delta
    Board.currentTetromino.y++
    if (Board.hasCollistion()) {
      Board.currentTetromino.y--
      handleFloorContact()
    }
  }
}

export function handleUserInput(delta: number) {
  if (Input.enter.isPressedOnCurrentFrame) {
    while (true) {
      Board.currentTetromino.y++
      if (Board.hasCollistion()) {
        Board.currentTetromino.y--
        handleFloorContact()
        break
      }
    }
  }
  if (Input.rotate.isPressedOnCurrentFrame) {
    Board.currentTetromino.rotate(Board)
  }
  if (Input.left.isPressedOnCurrentFrame) {
    Board.currentTetromino.x--
    if (Board.hasCollistion()) Board.currentTetromino.x++
  }
  if (Input.right.isPressedOnCurrentFrame) {
    Board.currentTetromino.x++
    if (Board.hasCollistion()) Board.currentTetromino.x--
  }
  if (Input.down.isPressedOnCurrentFrame) {
    Board.currentTetromino.y++
    if (Board.hasCollistion()) {
      Board.currentTetromino.y--
      handleFloorContact()
    } else lastTetrominoFallTimestamp = delta
  }
}

export function handleFloorContact() {
  Board.fixCurrentTetrominoToBoard()
  const completedRows = Board.processCompletdeRows()
  if (completedRows) {
    Game.score += completedRows * 10
    Game.speed += 1
  }

  if (Board.hasBlocksInFirstRow()) {
    Board.reset()
    Game.score = 0
    Game.speed = 0
  }
  Board.createNewTetromino()
}
