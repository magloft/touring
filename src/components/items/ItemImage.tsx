import { h, Component,  } from 'preact'
import cx from 'classnames'
import { IItemProps } from './IItemProps'

interface ItemImageState {
  src: string
  dataSrc: string
  loaded: boolean
}


export default class ItemImage extends Component<IItemProps, ItemImageState> {
  private element: HTMLElement
  state = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    dataSrc: null,
    loaded: false
  }

  inview(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio) {
        entry.target.addEventListener('load', this.loading.bind(this))
        entry.target.src = entry.target.getAttribute('data-src')
        observer.unobserve(entry.target)
      }
    })
  }

  loading(event) {
    if (event.target.complete) {
      this.setState({ loaded: true })
      if (this.props.onLayout) { this.props.onLayout() }
    }
  }

  componentDidMount() {
    this.setState({ dataSrc: this.props.value, loaded: false })
    const observer = new IntersectionObserver(this.inview.bind(this))
    observer.observe(this.element)
  }

  render({}: IItemProps, { loaded, src, dataSrc }: ItemImageState) {
    return (
      <div class={cx('trng-card-item-image', { 'trng-card-item-image-loaded': loaded })}>
        <img src={src} data-src={dataSrc} ref={(element) => { this.element = element }} />
      </div>
    )
  }
}
