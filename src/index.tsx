import { h, render } from 'preact'
import { ItemTypeComponent } from './components/items/IItemType'
import Tour, { ITourProps } from './components/Tour'
import { register } from './lib/ItemTypes'

let tour: any
let root: any

function touring({ context, steps }: ITourProps) {
  if (tour && root) { render(null, document.body, root) }
  root = render(<Tour context={context} steps={steps} ref={(container) => { tour = container }} />, document.body)
  return tour
}

touring.registerItemType = (identifier: string, ItemType: typeof ItemTypeComponent) => {
  register(identifier, ItemType)
}

export default touring
