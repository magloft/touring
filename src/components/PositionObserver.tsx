import { h, Component, ComponentChild, FunctionalComponent } from 'preact'

export interface PositionObserverProps {
  target: Element
  children: Function
}

export default class PositionObserver extends Component<PositionObserverProps> {
  private onResize: EventListener

  constructor(props) {
    super(props)
    this.onResize = () => { this.forceUpdate() }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, true)
    window.addEventListener('scroll', this.onResize, true)
    this.onResize(null)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onResize)
  }

  render() {
    const { target } = this.props
    const render = this.props.children[0]
    return render(target ? target.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 })
  }
}
