import React, { FC, useState } from 'react'
import { Input, InputProps } from './Input'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface Props extends Omit<InputProps, 'type'> {}

export const PasswordInput: FC<Props> = ({ ...props }) => {
  const [inputType, setInputType] = useState<'text' | 'password'>('password')

  return (
    <>
      <Input {...props} type={inputType} />
      <label className="password-input-switch">
        {inputType === 'text' ? 'Hide' : 'Show'}
        <VisuallyHidden>
          <input
            type="checkbox"
            role="switch"
            checked={inputType === 'text'}
            onChange={(event) => setInputType(event.target.checked ? 'text' : 'password')}
          />
        </VisuallyHidden>
      </label>
    </>
  )
}
