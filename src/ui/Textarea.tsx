import classNames from 'classnames'
import React, { FC, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextChange?: (value: string) => void
}

export const Textarea: FC<TextareaProps> = ({
  className,
  onTextChange,
  onChange,
  value,
  ...props
}) => {
  const rows = props.rows ?? 3
  return (
    <textarea
      {...props}
      className={classNames('textarea', className)}
      value={value}
      rows={rows}
      onChange={(event) => {
        onChange && onChange(event)
        onTextChange && onTextChange(event.target.value)
      }}
    />
  )
}
