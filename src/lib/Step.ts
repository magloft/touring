import jexl from 'jexl'
import Tour from '../components/Tour'
import { LayoutDirection } from './ILayout'
import Item from './Item'

jexl._addGrammarElement('$', { type: 'selector' })
jexl.addTransform('css', (selector: string) => document.querySelector(selector))
jexl.addTransform('run', (fn: () => any) => fn.call(null))

export default class Step {
  public readonly tour: Tour
  public readonly icon: string | null = null
  public readonly title: string | null = null
  public readonly selector: string | null = null
  public readonly lock: boolean = true
  public readonly overlay: boolean = true
  public readonly autoadvance: boolean = false
  public readonly listen: string[] = []
  public readonly preventSelector: string | null = null
  public readonly trigger: string[] = []
  public readonly positions: LayoutDirection[] = ['left', 'right', 'bottom', 'top']
  public readonly condition: string | null = null
  public id: string | null = null
  public items: Item[] = []
  public valid: boolean = false

  constructor(tour: Tour, config: Partial<Step> = {}) {
    this.tour = tour
    if (config.items) {
      config.items = config.items.map((item) => new Item(item))
    }
    if (!config.id) {
      const index = tour.props.steps.indexOf(config)
      config.id = `trng-step-${index}`
    }
    Object.assign(this, config)
    this.onChange = this.onChange.bind(this)
  }

  public begin() {
    const { element } = this
    if (element) {
      for (const eventName of this.listen) {
        element.addEventListener(eventName, this.onChange)
      }
      for (const triggerName of this.trigger) {
        if ((element as any)[triggerName]) {
          (element as any)[triggerName]()
        } else {
          const event = new CustomEvent(triggerName)
          element.dispatchEvent(event)
        }
      }
    }

    if(this.preventSelector){
      const elements = document.querySelectorAll(this.preventSelector)
      Array.from(elements).forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
        }, true)
      })
    }
  }

  public end() {
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

  public validate(context = {}) {
    if (this.condition) {
      const string = this.condition.replace(/\$\(([^)]+)\)/g, (_, selector) => `("${selector}"|css)`)
      this.valid = jexl.evalSync(string, context)
    } else {
      this.valid = true
    }
    return this.valid
  }

  private onChange(event: Event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const { step } = this.tour.state
    if (this.valid && step === this) {
      this.tour.continue()
    }
    return false
  }
}
