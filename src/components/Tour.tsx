import cx from 'classnames'
import { Component, h } from 'preact'
import Step from '../lib/Step'
import Backdrop from './Backdrop'
import Card from './Card'
import PositionObserver, { PositionObserverCallback } from './PositionObserver'

export interface ITourProps {
  context: any
  steps: any
}

interface ITourState {
  context: any
  readonly steps: Step[]
  active: boolean
  step: Step
}

export default class Tour extends Component<ITourProps, ITourState> {
  public static defaultProps: ITourProps = { context: window, steps: [] }
  private interval: number
  private card: Card
  private tourResolve: (value?: unknown) => void

  constructor(props: ITourProps) {
    super(props)
    const { context } = props
    const steps = props.steps.map((config: Partial<Step>) => new Step(this, config))
    this.state = { context, steps, active: false, step: steps[0] }

    this.validate = this.validate.bind(this)
    this.onBackdropClick = this.onBackdropClick.bind(this)
    this.continue = this.continue.bind(this)
    this.handleEvent = this.handleEvent.bind(this)
  }

  public start() {
    return new Promise((resolve) => {
      this.tourResolve = resolve
      this.continue(true)
    })
  }

  public continue(first = false) {
    return new Promise((resolve) => {
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
      this.setState({ step: nextStep, active: true }, resolve)
    })
  }

  public end() {
    this.setState({ active: false, step: null }, () => {
      if (this.tourResolve) {
        this.tourResolve()
        this.tourResolve = null
      }
    })
  }

  public validate() {
    const { context, step } = this.state
    if (!step) { return }
    step.validate(context)
    if (step.valid && step.autoadvance) {
      this.continue()
    } else {
      this.forceUpdate()
    }
  }

  public componentDidMount() {
    this.interval = window.setInterval(this.validate, 500)
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  public render({}: ITourProps, { active, step }: ITourState) {
    if (!step) { return false }
    return (
      <div class={cx('trng-tour', { 'trng-active': active })}>
        <PositionObserver target={step.element}>
          {this.renderContents}
        </PositionObserver>
      </div>
    )
  }

  private handleEvent(event: Event) {
    if (event.type === 'tour:continue') {
      if (this.state.step.valid) {
        this.continue()
      }
    }
  }

  private onBackdropClick(event: MouseEvent) {
    if ((event.target as Element).classList.contains('trng-backdrop') && this.card) {
      this.card.bounce()
    }
  }

  private renderContents: PositionObserverCallback = (rect: DOMRect, bounds: DOMRect) => {
    const { step, active } = this.state
    return (
      <span>
        <Backdrop active={active} rect={rect} lock={step.lock} overlay={step.overlay} onClick={this.onBackdropClick} />
        <Card
          ref={(card) => this.card = card}
          active={active && step.active && (!step.selector || (rect.width > 0 && rect.height > 0))}
          rect={rect}
          bounds={bounds}
          positions={step.positions}
          valid={step.valid}
          id={step.id}
          items={step.items}
          icon={step.icon}
          title={step.title}
          handleEvent={this.handleEvent} />
      </span>
    )
  }
}
