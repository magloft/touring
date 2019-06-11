import { h, Component, Ref } from 'preact'
import cx from 'classnames'
import Step from '../lib/Step'
import Card from './Card'
import Backdrop from './Backdrop'
import PositionObserver from './PositionObserver'
import './Tour.scss'

export interface TourProps {
  scope: any
  steps: any
  lock: boolean
}

interface TourState {
  scope: any
  readonly steps: Step[]
  active: boolean
  lock: boolean
  step: Step
}

export default class Tour extends Component<TourProps, TourState> {
  private card: Card

  static defaultProps = {
    scope: {},
    steps: [],
    lock: false
  }

  constructor(props: TourProps) {
    super(props)
    const { scope, lock = false } = props
    const steps = props.steps.map((config) => new Step(this, config))
    this.state = { scope, steps, active: false, lock, step: steps[0] }

    this.validate = this.validate.bind(this)
    this.onBackdropClick = this.onBackdropClick.bind(this)
    this.continue = this.continue.bind(this)
  }

  start() {
    this.continue(true)
  }

  continue(first = false) {
    const { steps, step, scope } = this.state
    let nextStep
    if (!first && step) {
      const currentIndex = steps.indexOf(step)
      const nextIndex = currentIndex + 1
      if (nextIndex >= steps.length) { return this.end() }
      nextStep = steps[nextIndex]
      step.end()
    } else {
      [nextStep] = steps
    }
    nextStep.begin()
    nextStep.validate(scope)
    this.setState({ step: nextStep, active: true })
  }

  end() {
    this.setState({ active: false })
  }

  validate() {
    const { scope, step } = this.state
    if (!step) { return }
    step.validate(scope)
    if (step.valid && step.autoadvance) {
      this.continue()
    } else {
      this.forceUpdate()
    }
  }

  onBackdropClick(event) {
    if (event.target.classList.contains('trng-backdrop') && this.card) {
      this.card.bounce()
    }
  }

  render(props, { active, lock, step }) {
    if (!step) { return false }
    return (
      <div class={cx('trng-tour', { 'trng-active': active, 'trng-lock': lock })}>
        <PositionObserver target={step.element}>
          {(rect) => (
            <span>
              <Backdrop active={active} rect={rect} onClick={this.onBackdropClick} />
              <Card active={active && step.active && (!step.selector || (rect.width > 0 && rect.height > 0))} ref={(card) => this.card = card} step={step} rect={rect}/>
            </span>
          )}
        </PositionObserver>
      </div>
    )
  }
}
