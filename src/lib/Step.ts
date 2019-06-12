import * as jexl from 'jexl'
import Tour from '../components/Tour'
import Item from './Item'

jexl._addGrammarElement('$', {
  type: 'selector'
})

jexl.addTransform('css', (selector) => document.querySelector(selector))
jexl.addTransform('run', (fn) => fn.call())

export default class Step {
  readonly tour: Tour
  readonly id: string
  readonly icon: string
  readonly title: string
  readonly selector: string
  readonly lock: boolean = true
  readonly overlay: boolean = true
  readonly autoadvance: boolean = false
  readonly listen: string[] = []
  readonly trigger: string[] = []
  readonly positions: string[] = ['left', 'right', 'bottom', 'top']
  readonly condition: string
  items: Item[] = []
  valid: boolean = false

  constructor(tour, config?:Partial<Step>) {
    this.tour = tour
    if (config.items) {
      config.items = config.items.map((item) => new Item(item))
    }
    Object.assign(this, config)
    this.onChange = this.onChange.bind(this)
  }

  begin() {
    const { element } = this
    if (element) {
      for (const eventName of this.listen) {
        element.addEventListener(eventName, this.onChange)
      }
      for (const triggerName of this.trigger) {
        if (element[triggerName]) {
          element[triggerName]()
        } else {
          const event = new CustomEvent(triggerName)
          element.dispatchEvent(event)
        }
      }
    }
  }

  end() {
    const { element } = this
    if (element) {
      for (const eventName of this.listen) {
        element.removeEventListener(eventName, this.onChange)
      }
    }
  }

  get element() {
    return this.selector ? document.querySelector(this.selector) : null
  }

  get active() {
    return (!this.selector || this.element)
  }

  validate(context = {}) {
    if (this.condition) {
      const string = this.condition.replace(/\$\(([^)]+)\)/g, (match, selector) => `("${selector}"|css)`)
      this.valid = jexl.evalSync(string, context)
    } else {
      this.valid = true
    }
    return this.valid
  }

  onChange(event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const { step } = this.tour.state
    if (this.valid && step === this) {
      this.tour.continue()
    }
    return false
  }
}
