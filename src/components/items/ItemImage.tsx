import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemImage extends Component<IItemProps> {
  render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-image'>
        <img src={value} />
      </div>
    )
  }
}
