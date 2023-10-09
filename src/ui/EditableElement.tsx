import React, { FC, JSX, TableHTMLAttributes } from 'react'

interface Props extends TableHTMLAttributes<HTMLOrSVGElement> {
  element: keyof JSX.IntrinsicElements
  initialValue: string
  label: string
  onValueChange: (value: string) => void
  value: string
}

export const EditableElement: FC<Props> = ({
  element,
  initialValue,
  label,
  onValueChange,
  value,
  ...props
}) => {
  const Element = element
  return (
    <Element
      {...props}
      aria-label={label}
      contentEditable
      onInput={(event) => onValueChange((event.target as any).innerHTML)}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: initialValue }}
    />
  )
}
