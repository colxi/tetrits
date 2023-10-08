import { config } from '../config'
import { Board } from './board'
import { DOM } from './dom'
import { Game } from './game'

export class UI {
  public static context: CanvasRenderingContext2D = DOM.UICanvas.getContext('2d')!
  public static mobileControls: HTMLElement = DOM.mobileControls
  public static canvas: HTMLCanvasElement = DOM.UICanvas

  public static init() {
    this.canvas.width = config.block.size * 6
    this.canvas.height = config.block.size * 4
    this.context.imageSmoothingEnabled = false
    this.context.strokeStyle = '#fcbe24'
    this.context.fillStyle = '#fcbe24'
    this.context.lineWidth = 2

    if(Game.isMobile) {
      this.showMobileControls()
      this.mobileControls.addEventListener('click', this.hideMobileControls.bind(this))
    }
  }
  
  public static hideMobileControls() {
    document.body.removeAttribute('preview-controls')
  }

  public static showMobileControls() {
    document.body.setAttribute('preview-controls', 'true')
  }

  public static render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
    // render next tetromino
    const offsetX = 20
    const offsetY = 20
    for (let y = 0; y < Board.nextTetromino.height; y++) {
      for (let x = 0; x < Board.nextTetromino.width; x++) {
        if (!Board.nextTetromino.data[y][x]) continue
        const cellX = x * config.block.size + offsetX
        const cellY = y * config.block.size + offsetY
        this.context.fillRect(cellX, cellY, config.block.size, config.block.size)
      }
    }

    // render game info
    DOM.infoBox.innerHTML = `
     ${Game.isPaused ? 'PAUSED<br/><br/>' : ''}
     Level: ${Game.level}<br/>
     Points: ${Game.score}<br/><br/>
     ARROW = Move<br/>
     SHIFT = Rotate<br/>
     ENTER = Fall<br/>
     P = Pause<br/>
   `
  }
}
