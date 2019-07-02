export type LayoutDirection = 'center' | 'left' | 'right' | 'top' | 'bottom'

export type LayoutDirectionMap = {
  [key in LayoutDirection]?: LayoutDirection
}

export interface ILayouter {
  direction: LayoutDirection
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect): boolean
  calculate(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect): ILayout
}

export interface ILayout {
  rect: DOMRect
  offset: IArrowOffset
  layouter: ILayouter
}

export type ILayouterMap = {
  [key in LayoutDirection]: ILayouter
}

export interface IArrowOffset {
  x: number
  y: number
}
