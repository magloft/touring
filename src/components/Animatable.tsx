import { Component, ComponentChildren } from 'preact'

type EventType = 'start' | 'end' | 'startRemoved' | 'endRemoved'
type EventMap = {
  [key in EventType]: string[]
}

const events: EventMap = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: []
}

export interface IAnimatableProps {
  children?: ComponentChildren
}

export interface IAnimatableState {
  animating: boolean
  clearAnimationClass: boolean
}

export default class Animatable<T extends IAnimatableProps, S extends IAnimatableState> extends Component<T, S> {
  public state = { animating: false, clearAnimationClass: false } as any as Readonly<S>

  constructor(props: T) {
    super(props)
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
  }

  public componentDidMount() {
    const { base } = this
    this.addEventListener('start', base, this.animationStart)
    this.addEventListener('end', base, this.animationEnd)
  }

  public shouldComponentUpdate({}, { animating }: IAnimatableState) {
    return this.state.animating !== animating
  }

  public componentWillUnmount() {
    const { base } = this
    this.removeEventListeners('start', base, this.animationStart)
    this.removeEventListeners('end', base, this.animationEnd)
  }

  public render({}: T, {}: S): JSX.Element { return null }

  private addEventListener(type: EventType, element: Element, eventHandler: EventHandlerNonNull) {
    events[type].map((event: string) => {
      element.addEventListener(event, eventHandler)
    })
  }

  private removeEventListeners(type: EventType, element: Element, eventHandler: EventHandlerNonNull) {
    events[type].map((event) => {
      element.removeEventListener(event, eventHandler)
    })
  }

  private updateEvents(type: EventType, event: string) {
    const removeEventType: EventType = (type + 'Removed' as EventType)
    events[removeEventType] = events[type].filter((e) => e !== event)
    events[type] = [event]
  }

  private animationStart(event: Event) {
    if (events.start.length > 1) {
      this.updateEvents('start', event.type)
      this.removeEventListeners('startRemoved', this.base, this.animationStart)
    }
    this.setState({ animating: true, clearAnimationClass: false })
  }

  private animationEnd(event: Event) {
    if (events.end.length > 1) {
      this.updateEvents('end', event.type)
      this.removeEventListeners('endRemoved', this.base, this.animationStart)
    }
    this.setState({ clearAnimationClass: true }, () => {
      this.setState({ animating: false, clearAnimationClass: false })
    })
  }
}
