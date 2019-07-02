import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

export default class ItemLink extends ItemTypeComponent {
  public render({ value, options = {} }: IItemProps) {
    const { target = '_blank', label = value.split('/').pop().split('#')[0].split('?')[0] } = options
    return (
      <a class='trng-card-item-link' href={value} target={target}>{label}</a>
    )
  }
}
