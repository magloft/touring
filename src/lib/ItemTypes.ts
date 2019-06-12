import ItemParagraph from '../components/items/ItemParagraph'
import ItemButton from '../components/items/ItemButton'
import ItemCode from '../components/items/ItemCode'
import ItemHint from '../components/items/ItemHint'
import ItemImage from '../components/items/ItemImage'
import ItemEmbed from '../components/items/ItemEmbed'
import ItemLink from '../components/items/ItemLink'

const ItemTypes = {
  paragraph: ItemParagraph,
  button: ItemButton,
  code: ItemCode,
  hint: ItemHint,
  image: ItemImage,
  embed: ItemEmbed,
  link: ItemLink
}

export function register(identifier, ItemType) {
  ItemTypes[identifier] = ItemType
}

export default ItemTypes
