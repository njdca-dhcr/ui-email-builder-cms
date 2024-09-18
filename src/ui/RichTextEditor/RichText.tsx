import React, { CSSProperties, ReactNode, createContext, forwardRef, useContext } from 'react'
import { AppElement, AppText } from './types'
import { Colors, Font, Spacing } from 'src/templates/styles'

export type RichTextAdditionalStyles = {
  'bulleted-list'?: CSSProperties
  'list-item'?: CSSProperties
  'numbered-list'?: CSSProperties
  link?: CSSProperties
  paragraph?: CSSProperties
  'text-size'?: CSSProperties
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
    const appElement: AppElement = element
    const additionalStyle = appElement.type ? additionalStyles[appElement.type]: {}

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
        return (
          <ul
            {...props}
            style={{
              margin: 0,
              padding: 0,
              marginLeft: Spacing.size.medium,
              ...additionalStyle,
              ...style,
            }}
          />
        )
      case 'numbered-list':
        return (
          <ol
            {...props}
            style={{
              margin: 0,
              padding: 0,
              marginLeft: Spacing.size.medium,
              ...additionalStyle,
              ...style,
            }}
          />
        )
      case 'list-item':
        return <li {...props} style={{ ...additionalStyle, ...style }} />
      case 'paragraph':
        return (
          <p
            {...props}
            style={{
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

const sizes = {
  tiny: Font.size.tiny,
  small: Font.size.small,
  medium: Font.size.medium,
  large: Font.size.large,
  extraLarge: Font.size.extraLarge,
}

interface RichTextLeafProps {
  leaf: AppText
  children?: ReactNode
  [key: string]: any
}

export const RichTextLeaf = forwardRef<any, RichTextLeafProps>(
  ({ leaf, children, ...remainingProps }, ref) => {
    const props = { ...remainingProps, ref }
    const appLeaf: AppText = leaf

    if (appLeaf.bold) {
      children = <strong>{children}</strong>
    }

    if (appLeaf.italic) {
      children = <em>{children}</em>
    }

    if (appLeaf.underline) {
      children = <u>{children}</u>
    }

    const fontSize = appLeaf.textSize ? sizes[appLeaf.textSize] : undefined

    return (
      <span {...props} style={{ ...remainingProps.style, fontSize }}>
        {children}
      </span>
    )
  },
)
