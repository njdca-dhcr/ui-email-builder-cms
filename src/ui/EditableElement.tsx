import React, { CSSProperties, FC, JSX, HTMLAttributes, TableHTMLAttributes } from 'react'

interface Props extends TableHTMLAttributes<HTMLOrSVGElement> {
  defaultValue: string
  element: keyof JSX.IntrinsicElements
  onValueChange: (value: string) => void
  value: string
}

export const EditableElement: FC<Props> = ({ element, defaultValue, onValueChange, ...props }) => {
  const Element = element
  return (
    <Element
      {...props}
      contentEditable
      onInput={(event) => onValueChange((event.target as any).innerHTML)}
      suppressContentEditableWarning
    >
      {defaultValue}
    </Element>
  )
}
