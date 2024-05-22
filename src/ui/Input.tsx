import classNames from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onTextChange?: (value: string) => void
}

export const Input: FC<InputProps> = ({ className, onTextChange, onChange, value, ...props }) => {
  return (
    <input
      {...props}
      className={classNames('input', className)}
      value={value}
      onChange={(event) => {
        onChange && onChange(event)
        onTextChange && onTextChange(event.target.value)
      }}
    />
  )
}
