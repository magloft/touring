import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemParagraph extends Component<IItemProps> {
  render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-paragraph'>{value}</div>
    )
  }
}
