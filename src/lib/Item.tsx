import { h } from 'preact'
import Step from './Step'
import ItemParagraph from '../components/items/ItemParagraph'
import ItemButton from '../components/items/ItemButton'
import ItemCode from '../components/items/ItemCode'
import ItemHint from '../components/items/ItemHint'
import ItemImage from '../components/items/ItemImage'
import ItemEmbed from '../components/items/ItemEmbed'

const ITEM_MAP = {
  paragraph: ItemParagraph,
  button: ItemButton,
  code: ItemCode,
  hint: ItemHint,
  image: ItemImage,
  embed: ItemEmbed
}

export default class Item {
  readonly type: string
  readonly value: string
  readonly options?: any

  constructor(config?:Partial<Item>) {
    Object.assign(this, config)
  }

  render(step: Step, onLayout: Function) {
    const Item = ITEM_MAP[this.type]
    if (Item == null) { return null }
    return (<Item step={step} type={this.type} value={this.value} options={this.options} onLayout={onLayout} />)
  }
}
