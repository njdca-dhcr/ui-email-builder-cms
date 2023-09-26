import React, { CSSProperties, FC, JSX } from 'react'

interface Props {
  defaultValue: string
  element: keyof JSX.IntrinsicElements
  onChange: (value: string) => void
  style?: CSSProperties
  value: string
}

export const EditableElement: FC<Props> = ({ element, defaultValue, onChange, style }) => {
  const Element = element
  return (
    <Element
      contentEditable
      onInput={(event) => onChange((event.target as any).innerHTML)}
      style={style}
      suppressContentEditableWarning
    >
      {defaultValue}
    </Element>
  )
}
