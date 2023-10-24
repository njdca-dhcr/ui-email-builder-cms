import React, { FC } from 'react'

interface Props {
  className?: string
  id: string
  onChange: (value: string) => void
  value: string
}

export const ColorPicker: FC<Props> = ({ className, id, onChange, value }) => {
  return (
    <div className={className}>
      <span aria-hidden>{value}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        id={id}
        type="color"
      />
    </div>
  )
}
