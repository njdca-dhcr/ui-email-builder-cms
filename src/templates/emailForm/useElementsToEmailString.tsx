import React, { MutableRefObject, useCallback } from 'react'
import { renderToString } from 'react-dom/server'
import { EmailLayout } from './EmailLayout'

export const useElementsToEmailString = (
  ref: MutableRefObject<HTMLElement | undefined>,
  title: string,
): (() => string) => {
  return useCallback(() => {
    if (ref.current) {
      return renderToString(<EmailLayout html={ref.current.innerHTML} title={title}></EmailLayout>)
    } else {
      return ''
    }
  }, [ref])
}
