import { h } from 'preact'
import { request } from '../../util/request'
import { IItemProps, ItemTypeComponent } from './IItemType'

interface IItemEmbedState {
  url: string | null
  ratio: number
}

export default class ItemEmbed extends ItemTypeComponent<IItemProps, IItemEmbedState> {
  public state: IItemEmbedState = { url: null, ratio: 270 / 480 }

  public componentDidMount() {
    const { props } = this
    const { value } = props
    request(`https://noembed.com/embed?url=${encodeURIComponent(value)}`).then(({ url, width, height }) => {
      const ratio = height / width
      this.setState({ url, ratio })
    })
  }

  public render({}: IItemProps, { url, ratio }: IItemEmbedState) {
    const style = {
      paddingTop: `${ratio * 100}%`
    }
    return (
      <div class='trng-card-item-embed'>
        <div class='trng-card-item-embed-wrapper' style={style}>
          {url && (<iframe class='trng-card-item-embed-iframe' src={url} allowFullScreen></iframe>)}
        </div>
      </div>
    )
  }
}
