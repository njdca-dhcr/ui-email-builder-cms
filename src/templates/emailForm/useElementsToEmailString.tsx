import React, { MutableRefObject, useCallback } from 'react'
import { renderToString } from 'react-dom/server'
import { EmailLayout } from './EmailLayout'

const DOCTYPE = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`

export const useElementsToEmailString = (
  ref: MutableRefObject<HTMLElement | undefined>,
  title: string,
): (() => string) => {
  return useCallback(() => {
    if (ref.current) {
      const rendered = renderToString(
        <EmailLayout html={ref.current.innerHTML} title={title}></EmailLayout>,
      )
      return `${DOCTYPE}${rendered}`
    } else {
      return ''
    }
  }, [ref])
}
