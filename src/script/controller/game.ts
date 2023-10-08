import { Board } from './board'
import { Input } from './input'
import { UI } from './ui'

export class Game {
  public static score: number = 0
  public static speed: number = 0
  public static isPaused: boolean = false
  public static boundedLoopMethod = this.loop.bind(this)
  public static update: (delta: number) => void = () => {}
  public static render: (delta: number) => void = () => {}

  public static get level(): number {
    return Math.floor(this.speed / 5)
  }

  public static get isMobile(): boolean {
    return window.innerWidth < 800
  }

  public static pause() {
    this.isPaused = true
  }

  public static resume() {
    this.isPaused = false
  }

  public static start() {
    UI.init()
    Input.init()
    Board.init()
    this.loop(0)
  }

  public static loop(delta: number) {
    this.update(delta)
    this.render(delta)
    Input.update()
    requestAnimationFrame(this.boundedLoopMethod)
  }

  public static onUpdate(callback: (delta: number) => void) {
    this.update = callback
  }

  public static onRender(callback: (delta: number) => void) {
    this.render = callback
  }
}
