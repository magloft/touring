import { h, render } from 'preact'
import Tour, { TourProps } from './components/Tour'
import { register } from './lib/ItemTypes'

let tour
let root

function touring({ context, steps }: TourProps) {
  if (tour && root) { render(null, document.body, root) }
  root = render(<Tour context={context} steps={steps} ref={(container) => { tour = container }} />, document.body)
  return tour
}

touring.registerItemType = function(identifier, ItemType) {
  register(identifier, ItemType)
}

export default touring
