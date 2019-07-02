import cx from 'classnames'
import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

interface IItemImageState {
  src: string
  dataSrc: string | null
  loaded: boolean
}

export default class ItemImage extends ItemTypeComponent<IItemProps, IItemImageState> {
  public state: IItemImageState = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    dataSrc: null,
    loaded: false
  }
  private element: HTMLElement | null = null

  public componentDidMount() {
    this.setState({ dataSrc: this.props.value, loaded: false })
    const observer = new IntersectionObserver(this.inview.bind(this))
    observer.observe(this.element)
  }

  public render({}: IItemProps, { loaded, src, dataSrc }: IItemImageState) {
    return (
      <div class={cx('trng-card-item-image', { 'trng-card-item-image-loaded': loaded })}>
        <img src={src} data-src={dataSrc} ref={(element) => { this.element = element }} />
      </div>
    )
  }

  private inview: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio) {
        const target = entry.target as HTMLImageElement
        target.addEventListener('load', this.loading)
        target.src = target.getAttribute('data-src')
        observer.unobserve(target)
      }
    })
  }

  private loading = (event: Event) => {
    const target = event.target as HTMLImageElement
    if (target.complete) {
      this.setState({ loaded: true })
      if (this.props.onLayout) { this.props.onLayout() }
    }
  }
}
