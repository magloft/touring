import { h, Component } from 'preact'
import cx from 'classnames'
import Step from '../lib/Step'
import Card from './Card'
import Backdrop from './Backdrop'
import PositionObserver from './PositionObserver'

export interface TourProps {
  context: any
  steps: any
}

interface TourState {
  context: any
  readonly steps: Step[]
  active: boolean
  step: Step
}

export default class Tour extends Component<TourProps, TourState> {
  private interval: NodeJS.Timeout
  private card: Card

  static defaultProps = {
    context: window,
    steps: []
  }

  constructor(props: TourProps) {
    super(props)
    const { context } = props
    const steps = props.steps.map((config) => new Step(this, config))
    this.state = { context, steps, active: false, step: steps[0] }

    this.validate = this.validate.bind(this)
    this.onBackdropClick = this.onBackdropClick.bind(this)
    this.continue = this.continue.bind(this)
  }

  start() {
    this.continue(true)
  }

  continue(first = false) {
    const { steps, step, context } = this.state
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
    nextStep.validate(context)
    this.setState({ step: nextStep, active: true })
  }

  end() {
    this.setState({ active: false, step: null })
  }

  validate() {
    const { context, step } = this.state
    if (!step) { return }
    step.validate(context)
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

  componentDidMount() {
    this.interval = setInterval(this.validate, 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render({}: TourProps, { active, step }: TourState) {
    if (!step) { return false }
    return (
      <div class={cx('trng-tour', { 'trng-active': active })}>
        <PositionObserver target={step.element}>
          {(rect) => (
            <span>
              <Backdrop active={active} rect={rect} lock={step.lock} overlay={step.overlay} onClick={this.onBackdropClick} />
              <Card active={active && step.active && (!step.selector || (rect.width > 0 && rect.height > 0))} ref={(card) => this.card = card} step={step} rect={rect}/>
            </span>
          )}
        </PositionObserver>
      </div>
    )
  }
}
