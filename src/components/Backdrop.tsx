import { h, Component, ComponentChild } from 'preact'
import cx from 'classnames'
import './Backdrop.scss'

const CLIP_SPACING = 8

export interface BackdropProps {
  rect?: DOMRect
  active?: boolean
  onClick?: (event) => void
}

export default class Backdrop extends Component<BackdropProps> {
  private onResize: EventListener

  static defaultProps = {
    rect: {},
    active: false
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, true)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  getStyle() {
    const { x, y, width, height } = this.props.rect

    const points = []
    points.push(['0%', '0%'])
    points.push(['0%', '100%'])
    points.push([`${x}px`, '100%'])
    points.push([`${x}px`, `${y + height + CLIP_SPACING}px`])
    points.push([`${x - CLIP_SPACING}px`, `${y + height}px`])
    points.push([`${x - CLIP_SPACING}px`, `${y}px`])
    points.push([`${x}px`, `${y - CLIP_SPACING}px`])
    points.push([`${x + width}px`, `${y - CLIP_SPACING}px`])
    points.push([`${x + width + CLIP_SPACING}px`, `${y}px`])
    points.push([`${x + width + CLIP_SPACING}px`, `${y + height}px`])
    points.push([`${x + width}px`, `${y + height  + CLIP_SPACING}px`])
    points.push([`${x}px`, `${y + height + CLIP_SPACING}px`])
    points.push([`${x}px`, `100%`])
    points.push(['100%', '100%'])
    points.push(['100%', '0%'])
    points.push(['0%', '0%'])

    const polygon = points.map(([x, y]) => `${x} ${y}`)
    return { clipPath: `polygon(${polygon.join(',')})` }
  }

  getClipInfo() {
    const bodyWidth = document.body.offsetWidth
    const bodyHeight = document.body.offsetHeight
    const { x, y, width, height } = this.props.rect
    const points = []
    points.push([x, y + height + CLIP_SPACING])
    points.push([x - CLIP_SPACING, y + height])
    points.push([x - CLIP_SPACING, y])
    points.push([x, y - CLIP_SPACING])
    points.push([x + width, y - CLIP_SPACING])
    points.push([x + width + CLIP_SPACING, y])
    points.push([x + width + CLIP_SPACING, y + height])
    points.push([x + width, y + height  + CLIP_SPACING])
    points.push([x, y + height + CLIP_SPACING])

    return {
      corners: [
        { cx: x, cy: y },
        { cx: x + width, cy: y },
        { cx: x + width, cy: y + height },
        { cx: x, cy: y + height }
      ],
      points: points.map((point) => point.join(' ')).join(','),
      width: `${bodyWidth}px`,
      height: `${bodyHeight}px`,
      viewBox: `0 0 ${bodyWidth} ${bodyHeight}`
    }
  }

  generateSvg({ corners, width, height, viewBox, points }) {
    return (
      <svg width={width} height={height} viewBox={viewBox}>
        <defs>
          <mask id='highlight'>
            <rect width='100%' height='100%' fill='white' />
            <polygon points={points} fill='black' />
            <circle r='8' cx={corners[0].cx} cy={corners[0].cy} fill='black' />
            <circle r='8' cx={corners[1].cx} cy={corners[1].cy} fill='black' />
            <circle r='8' cx={corners[2].cx} cy={corners[2].cy} fill='black' />
            <circle r='8' cx={corners[3].cx} cy={corners[3].cy} fill='black' />
          </mask>
        </defs>
        <rect x='0' y='0' width='100%' height='100%' fill='rgba(0,0,0,0.25)' mask='url(#highlight)' />
      </svg>
    )
  }

  render({ active }) {
    const info = this.getClipInfo()
    const svg = this.generateSvg(info)
    const style = this.getStyle()
    return (
      <div class={cx('trng-backdrop', { 'trng-active': active })} onClick={this.props.onClick} style={style}>
        {svg}
      </div>
    )
  }
}
