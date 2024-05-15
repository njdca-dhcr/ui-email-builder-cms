import React, { FC } from 'react'
import { Input } from './Input'

export interface AuthFieldProps {
  description?: string
  error?: string
  inputId: string
  label: string
  minLength?: number
  onTextChange: (value: string) => void
  required?: boolean
  type: 'email' | 'password'
  value: string
}

export const AuthField: FC<AuthFieldProps> = ({
  description,
  error,
  inputId,
  label,
  minLength,
  onTextChange,
  required,
  type,
  value,
}) => {
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className="auth-field">
      <div className="label-container">
        <label htmlFor={inputId}>{label}</label>
        {error && <p id={errorId}>{error}</p>}
      </div>
      <Input
        id={inputId}
        required={required}
        type={type}
        onTextChange={onTextChange}
        value={value}
        aria-invalid={!!error}
        aria-errormessage={error && errorId}
        aria-describedby={description && descriptionId}
        minLength={minLength}
      />
      {description && (
        <p id={descriptionId} className="description">
          {description}
        </p>
      )}
    </div>
  )
}
