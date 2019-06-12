const CARD_WIDTH = 360
const CARD_MIN_WIDTH = 240
const EDGE_SPACING = 10
const CARD_OFFSET = 20
const ARROW_WIDTH = 8

export interface Layouter {
  direction: string
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) : boolean
  calculate(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) : Layout
}

export interface ArrowOffset {
  x: number
  y: number
}

export interface Layout {
  rect: DOMRect
  offset: ArrowOffset
  layouter: Layouter
}

export const left: Layouter = {
  direction: 'left',
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) {
    return EDGE_SPACING + CARD_MIN_WIDTH < targetRect.x
  },
  calculate(containerRect, targetRect: DOMRect, cardRect: DOMRect) {
    const rect = new DOMRect(0, 0, CARD_WIDTH, cardRect.height)
    rect.x = targetRect.x - CARD_WIDTH - CARD_OFFSET
    rect.y = targetRect.y + targetRect.height / 2 - cardRect.height / 2
    const offset = transformOffset(containerRect, rect)
    return { rect, offset, layouter: this }
  }
}

export const right: Layouter = {
  direction: 'right',
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) {
    return targetRect.x + targetRect.width + CARD_MIN_WIDTH + CARD_OFFSET + EDGE_SPACING < containerRect.width
  },
  calculate(containerRect, targetRect: DOMRect, cardRect: DOMRect) {
    const rect = new DOMRect(0, 0, CARD_WIDTH, cardRect.height)
    rect.x = targetRect.x + targetRect.width + CARD_OFFSET
    rect.y = targetRect.y + targetRect.height / 2 - cardRect.height / 2
    const offset = transformOffset(containerRect, rect)
    return { rect, offset, layouter: this }
  }
}

export const top: Layouter = {
  direction: 'top',
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) {
    return EDGE_SPACING + cardRect.height < targetRect.y
  },
  calculate(containerRect, targetRect: DOMRect, cardRect: DOMRect) {
    const rect = new DOMRect(0, 0, CARD_WIDTH, cardRect.height)
    rect.x = targetRect.x + targetRect.width / 2 - cardRect.width / 2
    rect.y = targetRect.y - cardRect.height - CARD_OFFSET
    const offset = transformOffset(containerRect, rect)
    return { rect, offset, layouter: this }
  }
}

export const bottom: Layouter = {
  direction: 'bottom',
  matches(containerRect: DOMRect, targetRect: DOMRect, cardRect: DOMRect) {
    return targetRect.y + targetRect.height + cardRect.height + CARD_OFFSET + EDGE_SPACING < containerRect.width
  },
  calculate(containerRect, targetRect: DOMRect, cardRect: DOMRect) {
    const rect = new DOMRect(0, 0, CARD_WIDTH, cardRect.height)
    rect.x = targetRect.x + targetRect.width / 2 - cardRect.width / 2
    rect.y = targetRect.y + targetRect.height + CARD_OFFSET
    const offset = transformOffset(containerRect, rect)
    return { rect, offset, layouter: this }
  }
}

export const center: Layouter = {
  direction: 'center',
  matches() {
    return true
  },
  calculate(containerRect, targetRect: DOMRect, cardRect: DOMRect) {
    const rect = new DOMRect(0, 0, CARD_WIDTH, cardRect.height)
    rect.x = containerRect.width / 2 - cardRect.width / 2
    rect.y = containerRect.height / 2 - cardRect.height / 2
    const offset = transformOffset(containerRect, rect)
    return { rect, offset, layouter: this }
  }
}

const layouters = { center, left, right, top, bottom }

export function calculateLayout(directions, containerRect, targetRect: DOMRect, cardRect: DOMRect) : Layout {
  if (targetRect.width === 0) { return center.calculate(containerRect, targetRect, cardRect) }
  for (const direction of directions) {
    const layouter = layouters[direction]
    if (layouter.matches(containerRect, targetRect, cardRect)) {
      return layouter.calculate(containerRect, targetRect, cardRect)
    }
  }
  return center.calculate(containerRect, targetRect, cardRect)
}

const transformOffset = function(containerRect, rect: DOMRect) {
  const offset = { x: 0, y: 0 }
  if (rect.y < EDGE_SPACING) {
    offset.y = rect.y - EDGE_SPACING
    rect.y = EDGE_SPACING
  }
  if (rect.x < EDGE_SPACING) {
    offset.x = rect.x - EDGE_SPACING
    rect.x = EDGE_SPACING
    rect.width += offset.x
  }
  if (rect.right > containerRect.width - EDGE_SPACING) {
    offset.x = containerRect.width - EDGE_SPACING - rect.right
    rect.width += offset.x
  }
  if (rect.bottom > containerRect.width - EDGE_SPACING) {
    offset.y = - containerRect.width + EDGE_SPACING + rect.bottom
    rect.y -= offset.y
  }
  const signX = offset.x < 0 ? -1 : 1
  if (offset.x * 2 * signX - ARROW_WIDTH * signX > rect.width) { offset.x = rect.width / 2 * signX - ARROW_WIDTH * signX }
  const signY = offset.y < 0 ? -1 : 1
  if (offset.y * 2 * signY + ARROW_WIDTH * signY > rect.height) { offset.y = rect.height / 2 * signY - ARROW_WIDTH * signY }
  return offset
}
