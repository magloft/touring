import { h, Component } from 'preact'
import cx from 'classnames'
import AnimateOnChange from './AnimateOnChange'
import './Card.scss'
import Step from '../lib/Step'
import { calculateLayout, Layout } from '../lib/LayoutHandlers'

const DIRECTION_ARROW_MAP = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  center: 'none'
}

export interface CardProps {
  step: Step
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
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
    this.refCallback = this.refCallback.bind(this)
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

  render({ step, active }: CardProps, { animate }: CardState) {
    const { items } = step
    const iconStyle = { backgroundImage: `url(${step.icon})` }

    return (
      <AnimateOnChange
        ref={this.refCallback}
        className={cx('trng-card', { 'trng-active': active })}
        animationClassName='trng-card-bounce'
        animate={animate}
        onAnimationEnd={this.onAnimationEnd}>
        <div ref={(arrow) => { this.arrow = arrow }} class={cx('trng-card-arrow')} />
        <div class='trng-card-header'>
          <div class='trng-card-header-title'>{step.title}</div>
          <div class='trng-card-header-icon' style={iconStyle} />
        </div>
        {items.map(item => item.render(step))}
      </AnimateOnChange>
    )
  }
}
