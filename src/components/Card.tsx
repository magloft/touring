import cx from 'classnames'
import { h } from 'preact'
import { ILayout, LayoutDirection, LayoutDirectionMap } from '../lib/ILayout'
import Item from '../lib/Item'
import { calculateLayout } from '../lib/Layout'
import Animatable, { IAnimatableProps, IAnimatableState } from './Animatable'

const DIRECTION_ARROW_MAP: LayoutDirectionMap = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  center: 'center'
}

export interface ICardProps extends IAnimatableProps {
  active?: boolean
  rect?: DOMRect
  bounds: DOMRect
  positions: LayoutDirection[]
  valid: boolean
  id: string
  items: Item[]
  icon: string
  title: string,
  handleEvent: CallableFunction
}

export default class Card extends Animatable<ICardProps, IAnimatableState> {
  public static defaultProps: Partial<ICardProps> = {
    active: false,
    rect: new DOMRect()
  }
  private arrow: HTMLElement
  private element: HTMLElement
  private timeout: number = null

  constructor(props: ICardProps) {
    super(props)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
    this.refCallback = this.refCallback.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
  }

  public componentDidMount() {
    this.updateLayout()
    super.componentDidMount()
  }

  public shouldComponentUpdate(prevProps: ICardProps, prevState: IAnimatableState) {
    const { rect, bounds, id, valid, active } = this.props
    if (prevProps.rect.x !== rect.x || prevProps.rect.y !== rect.y
      || prevProps.rect.width !== rect.width || prevProps.rect.height !== rect.height) { return true }
    if (prevProps.bounds.width !== bounds.width || prevProps.bounds.height !== bounds.height) { return true }
    if (valid !== prevProps.valid || id !== prevProps.id) { return true }
    if (prevProps.active !== active) { return true }
    return super.shouldComponentUpdate(prevProps, prevState)
  }

  public render({ icon, items, active, title, handleEvent, valid }: ICardProps, { animating, clearAnimationClass }: IAnimatableState) {
    this.updateLayout()
    const animate = (animating && !clearAnimationClass)
    return (
      <div class={cx('trng-card', { 'trng-active': active, 'trng-card-bounce': animate })} ref={this.refCallback}>
        <div ref={(arrow) => { this.arrow = arrow }} class={cx('trng-card-arrow')} />
        <div class='trng-card-header'>
          <div class='trng-card-header-title'>{title}</div>
          {icon && <div class='trng-card-header-icon' style={{ backgroundImage: `url(${icon})` }} />}
        </div>
        {items.map((item) => item.render(handleEvent, valid, this.updateLayout))}
      </div>
    )
  }

  public bounce() {
    this.setState({ animating: true })
  }

  private getStyle({ rect }: ILayout) {
    return { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.width}px` }
  }

  private getArrowStyle({ offset, layouter }: ILayout) {
    const result = { 'margin-left': '0px', 'margin-top': '0px' }
    if (['left', 'right'].includes(layouter.direction)) {
      result['margin-top'] = `${offset.y}px`
    } else {
      result['margin-left'] = `${offset.x}px`
    }
    return result
  }

  private onAnimationEnd() {
    this.setState({ animating: false })
  }

  private refCallback(element: HTMLElement) {
    if (!element) { return }
    this.element = element
    this.updateLayout()
  }

  private updateLayout() {
    if (this.timeout) { clearTimeout(this.timeout) }
    this.timeout = window.setTimeout(() => {
      const { positions, rect, bounds } = this.props
      if (!this.element || !this.arrow) { return }
      const layout = calculateLayout(positions, bounds, rect, this.element.getBoundingClientRect() as DOMRect)
      for (const [key, value] of Object.entries(this.getStyle(layout))) {
        this.element.style.setProperty(key, value)
      }
      for (const [key, value] of Object.entries(this.getArrowStyle(layout))) {
        this.arrow.style.setProperty(key, value)
      }
      this.arrow.setAttribute('direction', DIRECTION_ARROW_MAP[layout.layouter.direction])
    }, 10)
  }
}
