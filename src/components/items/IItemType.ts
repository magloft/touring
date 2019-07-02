import { Component } from 'preact'

export interface IItemProps {
  handleEvent: CallableFunction
  type: string
  value: string
  valid: boolean
  options?: any
  onLayout?: () => {}
}

export abstract class ItemTypeComponent<P = IItemProps, S = {}> extends Component<P, S> {

}
