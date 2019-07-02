import { h } from 'preact'
import { IItemProps, ItemTypeComponent } from './IItemType'

export default class ItemButton extends ItemTypeComponent {
  constructor(props: IItemProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  public render({ value, valid, options = {} }: IItemProps) {
    const { backgroundColor = '#1a6ace', color = '#ffffff' } = options
    return (
      <div class='trng-card-item-button'>
        <a disabled={!valid} class='trng-card-item-button-btn' onClick={this.onClick} style={{ backgroundColor, color }}>{value}</a>
      </div>
    )
  }

  private onClick(event: MouseEvent) {
    event.preventDefault()
    this.props.handleEvent(new Event('tour:continue'))
  }
}
