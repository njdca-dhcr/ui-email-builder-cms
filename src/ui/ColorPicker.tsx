import React, { FC } from 'react'

interface Props {
  id: string
  onChange: (value: string) => void
  value: string
}

export const ColorPicker: FC<Props> = ({ id, onChange, value }) => {
  return (
    <div className="color-picker">
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
