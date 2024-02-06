import React, { CSSProperties, ReactNode, forwardRef } from 'react'
import { AppElement, AppText } from './types'

interface RichTextElementProps {
  element: AppElement
  children?: ReactNode
  style?: CSSProperties
  [key: string]: any
}

export const RichTextElement = forwardRef<any, RichTextElementProps>(
  ({ element, style, ...remainingProps }, ref) => {
    const props = { ...remainingProps, ref }

    switch (element.type) {
      case 'link':
        return <a href={element.url} rel="noopener noreferrer" target="_blank" {...props} />
      default:
        return <p {...props} style={{ ...style, margin: 0, padding: 0 }} />
    }
  },
)

interface RichTextLeafProps {
  leaf: AppText
  children?: ReactNode
  [key: string]: any
}

export const RichTextLeaf = forwardRef<any, RichTextLeafProps>(
  ({ leaf, children, ...remainingProps }, ref) => {
    const props = { ...remainingProps, ref }

    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...props}>{children}</span>
  },
)
