import { Input } from './controller/input'
import { Board } from './controller/board'
import { Game } from './controller/game'
import { UI } from './controller/ui'
import { handleTetrominoFall, handleUserInput } from './loop/update'

Game.onUpdate((delta: number) => {
  if (Input.pause.isPressedOnCurrentFrame) Game.isPaused ? Game.resume() : Game.pause()

  if (Game.isPaused) return
  handleTetrominoFall(delta)
  handleUserInput(delta)
})

Game.onRender(() => {
  Board.render()
  UI.render()
})

Game.start()
