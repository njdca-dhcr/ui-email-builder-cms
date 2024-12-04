import React, { MutableRefObject, useCallback } from 'react'
import { renderToString } from 'react-dom/server'
import { EmailLayout } from './EmailLayout'

const DOCTYPE = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`

export const useElementsToEmailString = (
  ref: MutableRefObject<HTMLElement | undefined>,
): ((title: string) => string) => {
  return useCallback(
    (title) => {
      if (ref.current) {
        const html = removeContentEditableAttributes(ref.current.innerHTML)
        const rendered = renderToString(<EmailLayout html={html} title={title} />)
        return `${DOCTYPE}${rendered}`
      } else {
        return ''
      }
    },
    [ref],
  )
}

const removeContentEditableAttributes = (value: string): string => {
  return value.replaceAll(/contenteditable=".+?"/g, '').replaceAll(/aria-label=".+?"/g, '')
}
