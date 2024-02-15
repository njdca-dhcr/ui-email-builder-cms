import React, { FC, useEffect, useState } from 'react'

interface Props {
  className?: string
  value: string
  onChange: (value: string) => void
  id: string
}

export const ColorInput: FC<Props> = ({ value, onChange, id, className }) => {
  const [controlledValue, setControlledValue] = useState(value)

  useEffect(() => {
    setControlledValue(value)
  }, [value])

  return (
    <input
      className={className}
      type="text"
      value={controlledValue}
      id={id}
      title="Must be a valid hex color code"
      minLength={4}
      maxLength={7}
      pattern="^#?(?:[0-9a-fA-F]{3}){1,2}$"
      onChange={(event) => {
        let newValue = event.target.value

        if (!newValue.startsWith('#')) {
          newValue = `#${newValue}`
        }
        setControlledValue(newValue)

        if (event.target.checkValidity()) onChange(newValue)
      }}
    />
  )
}
