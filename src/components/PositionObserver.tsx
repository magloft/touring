import { Component } from 'preact'

export type PositionObserverCallback = (rect: DOMRect, bounds: DOMRect) => JSX.Element

export interface IPositionObserverProps {
  target: Element
  children: PositionObserverCallback | PositionObserverCallback[]
}

export default class PositionObserver extends Component<IPositionObserverProps> {
  private onResize: EventListener

  constructor(props: IPositionObserverProps) {
    super(props)
    this.onResize = () => { this.forceUpdate() }
  }

  public componentDidMount() {
    window.addEventListener('resize', this.onResize, true)
    window.addEventListener('scroll', this.onResize, true)
    this.onResize(null)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onResize)
  }

  public render() {
    const { target, children } = this.props
    const render: PositionObserverCallback = (children as PositionObserverCallback[])[0]
    const rect = (target ? target.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 }) as DOMRect
    const bounds = document.body.getBoundingClientRect() as DOMRect
    return render(rect, bounds)
  }
}
