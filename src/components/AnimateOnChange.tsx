import { h, Component, Ref, ComponentChildren } from 'preact'

const events = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: []
}

export interface AnimateOnChangeProps {
  className: string
  animate: boolean
  animationClassName: string
  children: ComponentChildren
  onAnimationEnd?: Function
  style?: any
}

interface AnimateOnChangeState {
  animating: boolean
  clearAnimationClass: boolean
}

export default class AnimateOnChange extends Component<AnimateOnChangeProps, AnimateOnChangeState> {
  private root: Ref<HTMLElement>

  constructor(props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
  }

  componentDidMount() {
    const element = this.root
    this.addEventListener('start', element, this.animationStart)
    this.addEventListener('end', element, this.animationEnd)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.animating !== nextState.animating) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    const elm = this.root
    this.removeEventListeners('start', elm, this.animationStart)
    this.removeEventListeners('end', elm, this.animationEnd)
  }

  addEventListener(type, elm, eventHandler) {
    events[type].map((event) => {
      elm.addEventListener(event, eventHandler)
    })
  }

  removeEventListeners(type, elm, eventHandler) {
    events[type].map((event) => {
      elm.removeEventListener(event, eventHandler)
    })
  }

  updateEvents(type, newEvent) {
    events[type + 'Removed'] = events[type].filter((e) => e !== newEvent)
    events[type] = [newEvent]
  }

  animationStart(e) {
    if (events.start.length > 1) {
      this.updateEvents('start', e.type)
      this.removeEventListeners('startRemoved', this.root, this.animationStart)
    }
    this.setState({ animating: true, clearAnimationClass: false })
  }

  animationEnd(e) {
    if (events.end.length > 1) {
      this.updateEvents('end', e.type)
      this.removeEventListeners('endRemoved', this.root, this.animationStart)
    }
    this.setState({ clearAnimationClass: true }, () => {
      this.setState({ animating: false, clearAnimationClass: false }, () => {
        if (this.props.onAnimationEnd) {
          this.props.onAnimationEnd()
        }
      })
    })
  }

  render({ className, animate, animationClassName, children, style }, { clearAnimationClass }) {
    const klass = (animate && !clearAnimationClass) ? `${className} ${animationClassName}` : className
    return <div ref={(root) => { this.root = root }} className={klass} style={style}>{children}</div>
  }
}
