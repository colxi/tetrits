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
    document.addEventListener('keydown', this.habdleKeyDown.bind(this))
    document.addEventListener('keyup', this.habdleKeyUp.bind(this))
    this.isInitiated = true
  }

  static habdleKeyDown(e: KeyboardEvent) {
    e.preventDefault()
    switch (e.key) {
      case 'ArrowLeft': {
        this.left.isPressed = true
        this.left.onCurrentFrame = true
        break
      }
      case 'ArrowRight': {
        this.right.isPressed = true
        this.right.onCurrentFrame = true
        break
      }
      case 'ArrowDown': {
        this.down.isPressed = true
        this.down.onCurrentFrame = true
        break
      }
      case 'Shift': {
        this.rotate.isPressed = true
        this.rotate.onCurrentFrame = true
        break
      }
      case 'Enter': {
        this.enter.isPressed = true
        this.enter.onCurrentFrame = true
        break
      }
      case 'P':
      case 'p': {
        this.pause.isPressed = true
        this.pause.onCurrentFrame = true
        break
      }
    }
  }

  static habdleKeyUp(e: KeyboardEvent) {
    e.preventDefault()
    switch (e.key) {
      case 'ArrowLeft': {
        this.left.isPressed = false
        this.left.onCurrentFrame = true
        break
      }
      case 'ArrowRight': {
        this.right.isPressed = false
        this.right.onCurrentFrame = true
        break
      }
      case 'ArrowDown': {
        this.down.isPressed = false
        this.down.onCurrentFrame = true
        break
      }
      case 'Shift': {
        this.rotate.isPressed = false
        this.rotate.onCurrentFrame = true
        break
      }
      case 'Enter': {
        this.enter.isPressed = false
        this.enter.onCurrentFrame = true
        break
      }
      case 'P':
      case 'p': {
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
