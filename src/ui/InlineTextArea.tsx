import React, { CSSProperties, FC, useEffect, useRef } from 'react'
import { VisuallyHidden } from '@reach/visually-hidden'

interface Props {
  autofocus?: boolean
  label: string
  onChange: (value: string) => void
  style?: CSSProperties
  value: string
}

export const InlineTextArea: FC<Props> = ({ autofocus, label, onChange, style, value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>()

  // Keep track of the height of the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${scrollHeight}px`
    }
  }, [textareaRef, value])

  // Move the cursor to the end when this component first appears
  useEffect(() => {
    if (textareaRef.current) {
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [textareaRef])

  return (
    <label style={labelStyles}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <textarea
        autoFocus={autofocus}
        ref={textareaRef as any}
        style={{ ...textareaStyles, ...style }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

const textareaStyles: CSSProperties = {
  border: 0,
  resize: 'none',
  padding: 0,
  width: '100%',
}

const labelStyles: CSSProperties = {
  width: '100%',
}
