import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemCode extends Component<IItemProps> {
  render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-code'>{value}</div>
    )
  }
}
