import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

export default class ItemHint extends ItemTypeComponent {
  public render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-hint'>{value}</div>
    )
  }
}
