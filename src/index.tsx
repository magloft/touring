import { h, render } from 'preact'
import Tour, { TourProps } from './components/Tour'

let tour
let root

export default function touring({ scope, steps, lock }: TourProps) {
  if (tour && root) { render(null, document.body, root) }
  root = render(<Tour scope={scope} steps={steps} lock={lock} ref={(container) => { tour = container }} />, document.body)
  return tour
}
