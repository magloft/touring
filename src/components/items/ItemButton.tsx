import { h, Component } from 'preact'
import { IItemProps } from './IItemProps'

export default class ItemButton extends Component<IItemProps> {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    event.preventDefault()
    if (this.props.step.valid) {
      this.props.step.tour.continue()
    }
  }

  render({ value, step, options = {} }: IItemProps) {
    const { backgroundColor = '#1a6ace', color = '#ffffff' } = options
    return (
      <div class='trng-card-item-button'>
        <a disabled={!step.valid} class='trng-card-item-button-btn' onClick={this.onClick} style={{ backgroundColor, color }}>{value}</a>
      </div>
    )
  }
}
