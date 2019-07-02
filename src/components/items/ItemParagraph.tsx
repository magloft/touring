import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

export default class ItemParagraph extends ItemTypeComponent {
  public render({ value }: IItemProps) {
    return (
      <div class='trng-card-item-paragraph'>{value}</div>
    )
  }
}
