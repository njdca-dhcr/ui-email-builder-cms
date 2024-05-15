import classNames from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onTextChange: (value: string) => void
  value: string
}

export const Input: FC<Props> = ({ className, onTextChange, value, ...props }) => {
  return (
    <input
      {...props}
      className={classNames('input', className)}
      value={value}
      onChange={(event) => onTextChange(event.target.value)}
    />
  )
}
