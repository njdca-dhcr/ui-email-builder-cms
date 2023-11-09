export type CursorPosition = 'end' | 'highlight'

export const focusAndPlaceCursorAtEnd = (element: HTMLElement) => {
  const selection = window.getSelection()!
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.addRange(range)
  element.focus()
}

export const focusAndHighlight = (element: HTMLElement) => {
  const selection = window.getSelection()!
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(element)
  selection.addRange(range)
  element.focus()
}

export const focusAndSetCursor = (element: HTMLElement, cursor: CursorPosition) => {
  switch (cursor) {
    case 'end':
      focusAndPlaceCursorAtEnd(element)
      break
    case 'highlight':
      focusAndHighlight(element)
      break
  }
}
