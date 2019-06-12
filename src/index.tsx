import { h, render } from 'preact'
import Tour, { TourProps } from './components/Tour'

let tour
let root

export default function touring({ context, steps }: TourProps) {
  if (tour && root) { render(null, document.body, root) }
  root = render(<Tour context={context} steps={steps} ref={(container) => { tour = container }} />, document.body)
  return tour
}
