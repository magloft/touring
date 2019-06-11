import { get } from 'object-path'
import Condition from './Condition'
import Tour from '../components/Tour'

export default class Step {
  readonly tour: Tour
  readonly id: string
  readonly icon: string
  readonly title: string
  readonly message: string
  readonly selector: string
  conditions: Condition[] = []
  readonly autoadvance: boolean = false
  readonly listen: string[] = []
  readonly trigger: string[] = []
  readonly buttonLabel: string = 'Continue'
  readonly buttonColor: string = '#178bf5'
  readonly positions: string[] = ['right', 'left', 'bottom', 'top']
  valid: boolean = false

  constructor(tour, config?:Partial<Step>) {
    this.tour = tour
    if (config.conditions) {
      config.conditions = config.conditions.map(([property, comparator, value]: any) => new Condition(property, comparator, value))
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

  validate(object = {}) {
    const results = this.conditions.filter((condition) => {
      const value = get(object, condition.property)
      return condition.validate(value)
    })
    this.valid = results.length === this.conditions.length
    return this.valid
  }

  onChange() {
    const { step } = this.tour.state
    if (this.valid && step === this) {
      this.tour.continue()
    }
  }
}
