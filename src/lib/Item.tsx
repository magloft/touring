import { h } from 'preact'
import Step from './Step'
import ItemTypes from './ItemTypes'

export default class Item {
  readonly type: string
  readonly value: string
  readonly options?: any

  constructor(config?:Partial<Item>) {
    Object.assign(this, config)
  }

  render(step: Step, onLayout: Function) {
    const ItemType = ItemTypes[this.type]
    if (Item == null) { return null }
    return (<ItemType step={step} type={this.type} value={this.value} options={this.options} onLayout={onLayout} />)
  }
}
