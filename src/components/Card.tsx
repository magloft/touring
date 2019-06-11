import { h, Component, Ref } from 'preact'
import cx from 'classnames'
import AnimateOnChange from './AnimateOnChange'
import './Card.scss'
import Step from '../lib/Step'
import { calculateLayout, Layout } from '../lib/LayoutHandlers'

const DIRECTION_ARROW_MAP = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
}

export interface CardProps {
  step: Step
  onContinue?: Function
  active?: boolean
  rect?: DOMRect
}

interface CardState {
  animate: boolean
}

export default class Card extends Component<CardProps, CardState> {
  private arrow: HTMLElement

  public state = { animate: false }

  static defaultProps = {
    active: false,
    rect: {}
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
    this.refCallback = this.refCallback.bind(this)
  }

  onClick(event) {
    event.preventDefault()
    if (this.props.step.valid && this.props.onContinue) {
      this.props.onContinue()
    }
  }

  getLayout(targetRect, element) {
    return calculateLayout(this.props.step.positions, targetRect, element.getBoundingClientRect())
  }

  getStyle({ rect }: Layout) {
    return { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.width}px` }
  }

  getArrowStyle({ offset, layouter }: Layout) {
    const result = { marginLeft: '0px', marginTop: '0px' }
    if (['left', 'right'].includes(layouter.direction)) {
      result.marginTop = `${offset.y}px`
    } else {
      result.marginLeft = `${offset.x}px`
    }
    return result
  }

  bounce() {
    this.setState({ animate: true })
  }

  onAnimationEnd() {
    this.setState({ animate: false })
  }

  private timeout = null
  refCallback(element) {
    if (element) {
      if (this.timeout) { clearTimeout(this.timeout) }
      this.timeout = setTimeout(() => {
        const { step, rect } = this.props
        const layout = calculateLayout(step.positions, rect, element.base.getBoundingClientRect())
        for (const [key, value] of Object.entries(this.getStyle(layout))) {
          element.base.style[key] = value
        }
        for (const [key, value] of Object.entries(this.getArrowStyle(layout))) {
          this.arrow.style[key] = value
        }
        this.arrow.setAttribute('direction', DIRECTION_ARROW_MAP[layout.layouter.direction])
      }, 10)
    }
  }

  render({ step, active, rect }, { animate }) {
    const iconStyle = { backgroundImage: `url(${step.icon})` }
    return (
      <AnimateOnChange
        ref={this.refCallback}
        className={cx('trng-card', { 'trng-active': active })}
        animationClassName='trng-card-bounce'
        animate={animate}
        onAnimationEnd={this.onAnimationEnd}>
        <div class='trng-card-header'>
          <div class='trng-card-header-title'>{step.title}</div>
          <div class='trng-card-header-icon' style={iconStyle} />
        </div>
        <div class='trng-card-body'>
          <div class='trng-card-body-message' dangerouslySetInnerHTML={{ __html: step.message }} />
        </div>
        {step.buttonLabel && (
          <div class='trng-card-footer'>
            <a
              disabled={!step.valid}
              class='trng-card-footer-button'
              onClick={this.onClick}
              style={{ backgroundColor: step.buttonColor }}>{step.buttonLabel}</a>
          </div>
        )}
        <div ref={(arrow) => { this.arrow = arrow }} class={cx('trng-card-arrow')} />
      </AnimateOnChange>
    )
  }
}
