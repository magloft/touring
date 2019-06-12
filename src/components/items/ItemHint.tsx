import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemHint extends Component<IItemProps> {
  render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-hint'>{value}</div>
    )
  }
}
