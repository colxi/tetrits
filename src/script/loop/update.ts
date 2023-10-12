import { config } from '../config'
import { Board } from '../controller/board'
import { Game } from '../controller/game'
import { Input } from '../controller/input'

let lastTetrominoFallTimestamp = 0
export function handleTetrominoFall(delta: number) {
  const elapsed = delta - lastTetrominoFallTimestamp
  if (elapsed > 1500 - Game.speed * config.speedMultiplier) {
    lastTetrominoFallTimestamp = delta
    Board.currentTetromino.y++
    if (Board.hasCollision()) {
      Board.currentTetromino.y--
      handleFloorContact()
    }
  }
}

export function handleUserInput(delta: number) {
  const isDownLongPress = Input.down.isPressed && Date.now() - Input.tapStart > 500
  if (Input.enter.isPressedOnCurrentFrame || isDownLongPress) {
    while (true) {
      Board.currentTetromino.y++
      if (Board.hasCollision()) {
        Board.currentTetromino.y--
        handleFloorContact()
        break
      }
    }
    Input.resetTapStart()
  }

  if (Input.rotate.isPressedOnCurrentFrame) {
    Board.currentTetromino.rotate(Board)
  }
  if (Input.left.isPressedOnCurrentFrame) {
    Board.currentTetromino.x--
    if (Board.hasCollision()) Board.currentTetromino.x++
  }
  if (Input.right.isPressedOnCurrentFrame) {
    Board.currentTetromino.x++
    if (Board.hasCollision()) Board.currentTetromino.x--
  }
  if (Input.down.isPressedOnCurrentFrame) {
    Board.currentTetromino.y++
    if (Board.hasCollision()) {
      Board.currentTetromino.y--
      handleFloorContact()
    } else lastTetrominoFallTimestamp = delta
  }
}

export function handleFloorContact() {
  Board.fixCurrentTetrominoToBoard()
  const completedRows = Board.processCompletedRows()
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
