import { h, Component, Ref } from 'preact'
import cx from 'classnames'
import AnimateOnChange from './AnimateOnChange'
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
  private element: Ref<HTMLElement>

  public state = { animate: false }

  static defaultProps = {
    active: false,
    rect: {}
  }

  constructor(props) {
    super(props)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
    this.refCallback = this.refCallback.bind(this)
    this.onLayout = this.onLayout.bind(this)
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
    if (!element) { return }
    this.element = element
    if (this.timeout) { clearTimeout(this.timeout) }
    this.timeout = setTimeout(this.onLayout, 10)
  }

  onLayout() {
    const { step, rect } = this.props
    const { base } = this.element as any
    if (!base || !this.arrow) { return }
    const { tour } = this.props.step
    const containerRect = tour.base.getBoundingClientRect()
    const layout = calculateLayout(step.positions,containerRect, rect, base.getBoundingClientRect())
    for (const [key, value] of Object.entries(this.getStyle(layout))) {
      base.style[key] = value
    }
    for (const [key, value] of Object.entries(this.getArrowStyle(layout))) {
      this.arrow.style[key] = value
    }
    this.arrow.setAttribute('direction', DIRECTION_ARROW_MAP[layout.layouter.direction])
  }

  componentDidMount() {
    this.onLayout()
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
        {items.map(item => item.render(step, this.onLayout))}
      </AnimateOnChange>
    )
  }
}
