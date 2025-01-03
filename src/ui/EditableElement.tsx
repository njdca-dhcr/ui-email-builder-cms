import React, { JSX, TableHTMLAttributes, forwardRef, useMemo } from 'react'

interface Props extends TableHTMLAttributes<HTMLOrSVGElement> {
  element: keyof JSX.IntrinsicElements
  label: string
  onValueChange: (value: string) => void
  value: string
  valueKey?: any
  readOnly?: boolean
}

export const EditableElement = forwardRef<HTMLElement, Props>(
  ({ element, label, onValueChange, value, valueKey, readOnly, ...props }, ref) => {
    const Element = element

    const initialValue = useMemo(() => value, [valueKey])

    return (
      <Element
        {...props}
        aria-label={label}
        contentEditable={!readOnly}
        tabIndex={0}
        onInput={(event) => {
          onValueChange((event.target as any).innerHTML)
        }}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: initialValue }}
        onPasteCapture={(event) => {
          event.preventDefault()
          document.execCommand('insertText', false, event.clipboardData.getData('text/plain'))
        }}
        readOnly={readOnly}
        aria-readonly={readOnly}
        {...({ ref } as any)}
      />
    )
  },
)
