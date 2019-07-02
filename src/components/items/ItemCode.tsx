import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

export default class ItemCode extends ItemTypeComponent {
  public render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-code'>{value}</div>
    )
  }
}
