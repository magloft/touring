import Step from '../../lib/Step'

export interface IItemProps {
  step: Step
  type: string
  value: string
  options?: any
  onLayout?: Function
}
