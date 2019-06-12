import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemLink extends Component<IItemProps> {
  render({ value, options = {} }: IItemProps) {
    const { target = '_blank', label = value.split('/').pop().split('#')[0].split('?')[0] } = options
    return (
      <a class='trng-card-item-link' href={value} target={target}>{label}</a>
    )
  }
}
