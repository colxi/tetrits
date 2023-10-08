import { DOM } from './dom';
class InputEvent {
  public isPressed: boolean = false
  public onCurrentFrame: boolean = false

  get isPressedOnCurrentFrame() {
    return this.isPressed && this.onCurrentFrame
  }
}

export class Input {
  static isInitiated: boolean = false
  static enter: InputEvent = new InputEvent()
  static down: InputEvent = new InputEvent()
  static left: InputEvent = new InputEvent()
  static right: InputEvent = new InputEvent()
  static rotate: InputEvent = new InputEvent()
  static pause: InputEvent = new InputEvent()

  static init() {
    if (this.isInitiated) return
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
    DOM.buttonLeft.addEventListener('mousedown', ()=> this.handleTap('ArrowLeft'))
    DOM.buttonRight.addEventListener('mousedown', ()=> this.handleTap('ArrowRight'))
    DOM.buttonRotate.addEventListener('mousedown', ()=> this.handleTap('ArrowUp'))
    DOM.buttonFall.addEventListener('mousedown', ()=> this.handleTap('ArrowDown'))

    DOM.buttonLeft.addEventListener('mouseup', ()=> this.handleUTap('ArrowLeft'))
    DOM.buttonRight.addEventListener('mouseup', ()=> this.handleUTap('ArrowRight'))
    DOM.buttonRotate.addEventListener('mouseup', ()=> this.handleUTap('ArrowUp'))
    DOM.buttonFall.addEventListener('mouseup', ()=> this.handleUTap('ArrowDown'))
    this.isInitiated = true
  }

  static handleTap(key: string){
    const event = new KeyboardEvent('keydown' ,  {key})
    this.handleKeyDown(event)
  }

  static handleUTap(key: string){
    const event = new KeyboardEvent('keyup' ,  {key})
    this.handleKeyUp(event)
  }

  static handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft': {
        e.preventDefault()
        this.left.isPressed = true
        this.left.onCurrentFrame = true
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        this.right.isPressed = true
        this.right.onCurrentFrame = true
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        this.down.isPressed = true
        this.down.onCurrentFrame = true
        break
      }
      case 'ArrowUp': 
      case 'Shift': {
        e.preventDefault()
        this.rotate.isPressed = true
        this.rotate.onCurrentFrame = true
        break
      }
      case 'Enter': {
        e.preventDefault()
        this.enter.isPressed = true
        this.enter.onCurrentFrame = true
        break
      }
      case 'P':
      case 'p': {
        e.preventDefault()
        this.pause.isPressed = true
        this.pause.onCurrentFrame = true
        break
      }
    }
  }

  static handleKeyUp(e: KeyboardEvent) {
    e.preventDefault()
    switch (e.key) {
      case 'ArrowLeft': {
        e.preventDefault()
        this.left.isPressed = false
        this.left.onCurrentFrame = true
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        this.right.isPressed = false
        this.right.onCurrentFrame = true
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        this.down.isPressed = false
        this.down.onCurrentFrame = true
        break
      }
      case 'ArrowUp': 
      case 'Shift': {
        e.preventDefault()
        this.rotate.isPressed = false
        this.rotate.onCurrentFrame = true
        break
      }
      case 'Enter': {
        e.preventDefault()
        this.enter.isPressed = false
        this.enter.onCurrentFrame = true
        break
      }
      case 'P':
      case 'p': {
        e.preventDefault()
        this.pause.isPressed = false
        this.pause.onCurrentFrame = true
        break
      }
    }
  }

  static update() {
    this.down.onCurrentFrame = false
    this.left.onCurrentFrame = false
    this.right.onCurrentFrame = false
    this.rotate.onCurrentFrame = false
    this.pause.onCurrentFrame = false
    this.enter.onCurrentFrame = false
  }
}
