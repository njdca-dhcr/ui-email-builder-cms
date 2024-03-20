import React, { CSSProperties, ReactNode, createContext, forwardRef, useContext } from 'react'
import { AppElement, AppText } from './types'
import { Colors } from 'src/templates/styles'

export type RichTextAdditionalStyles = {
  'bulleted-list'?: CSSProperties
  'list-item'?: CSSProperties
  'numbered-list'?: CSSProperties
  link?: CSSProperties
  paragraph?: CSSProperties
}

export const RichTextAdditionalStylesContext = createContext<RichTextAdditionalStyles>({})

const useRichTextAdditionalStyles = () => useContext(RichTextAdditionalStylesContext)

interface RichTextElementProps {
  element: AppElement
  children?: ReactNode
  style?: CSSProperties
  [key: string]: any
}

export const RichTextElement = forwardRef<any, RichTextElementProps>(
  ({ element, style, ...remainingProps }, ref) => {
    const props = { ...remainingProps, ref }
    const additionalStyles = useRichTextAdditionalStyles()
    const additionalStyle = element.type ? additionalStyles[element.type] : {}

    switch (element.type) {
      case 'link':
        return (
          <a
            href={element.url}
            rel="noopener noreferrer"
            target="_blank"
            style={{
              color: Colors.linkBlue,
              textDecoration: 'underline',
              ...additionalStyle,
              ...style,
            }}
            {...props}
          />
        )
      case 'bulleted-list':
        return <ul {...props} style={{ margin: 0, padding: 0, ...additionalStyle, ...style }} />
      case 'numbered-list':
        return <ol {...props} style={{ margin: 0, padding: 0, ...additionalStyle, ...style }} />
      case 'list-item':
        return <li {...props} style={{ ...additionalStyle, ...style }} />
      case 'paragraph':
        return (
          <p
            {...props}
            style={{
              ...style,
              margin: 0,
              padding: 0,
              whiteSpace: 'pre-wrap',
              ...additionalStyle,
              ...style,
            }}
          />
        )
      default:
        return <div {...props} style={style} />
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
