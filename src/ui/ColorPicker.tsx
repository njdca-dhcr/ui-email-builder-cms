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
      <input
        value={expandHex(value)}
        onChange={(event) => onChange(event.target.value)}
        id={id}
        type="color"
      />
    </div>
  )
}

const VALID_LONG_HEX = /^#[a-fA-F0-9]{6}$/

const expandHex = (hex: string): string => {
  if (hex.match(VALID_LONG_HEX)) {
    return hex
  } else {
    return hex.replace(/^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/, '#$1$1$2$2$3$3')
  }
}
