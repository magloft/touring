import { h } from 'preact'
import ItemTypes from './ItemTypes'

export default class Item {
  public readonly type: string
  public readonly value: string
  public readonly options?: any

  constructor(config?: Partial<Item>) {
    Object.assign(this, config)
  }

  public render(handleEvent: CallableFunction, valid: boolean, onLayout: () => void) {
    const ItemType = ItemTypes[this.type]
    if (Item == null) { return null }
    return (<ItemType handleEvent={handleEvent} valid={valid} type={this.type} value={this.value} options={this.options} onLayout={onLayout} />)
  }
}
