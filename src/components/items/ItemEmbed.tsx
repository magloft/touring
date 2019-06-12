import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'
import { request } from '../../util/request'

interface ItemEmbedState {
  url: string
  ratio: number
}

export default class ItemEmbed extends Component<IItemProps> {
  state = { url: null, ratio: 270 / 480 }

  componentDidMount() {
    const { props } = this
    const { value } = props
    request(`https://noembed.com/embed?url=${encodeURIComponent(value)}`).then(({ url, width, height }) => {
      const ratio = height / width
      this.setState({ url, ratio })
    })
  }

  render({}: IItemProps, { url, ratio }:ItemEmbedState) {
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