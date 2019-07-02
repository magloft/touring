import { ItemTypeComponent } from '../components/items/IItemType'
import ItemButton from '../components/items/ItemButton'
import ItemCode from '../components/items/ItemCode'
import ItemEmbed from '../components/items/ItemEmbed'
import ItemHint from '../components/items/ItemHint'
import ItemImage from '../components/items/ItemImage'
import ItemLink from '../components/items/ItemLink'
import ItemParagraph from '../components/items/ItemParagraph'

interface IItemTypeMap { [s: string]: typeof ItemTypeComponent }

const ItemTypes: IItemTypeMap = {}

export function register(identifier: string, ItemType: any) {
  ItemTypes[identifier] = ItemType
}

register('paragraph', ItemParagraph)
register('button', ItemButton)
register('code', ItemCode)
register('hint', ItemHint)
register('image', ItemImage)
register('embed', ItemEmbed)
register('link', ItemLink)

export default ItemTypes
