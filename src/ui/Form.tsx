import React, { FC, FormEventHandler, HTMLProps } from 'react'
import { Input, InputProps } from './Input'
import classNames from 'classnames'
import { Alert } from './Alert'
import './Form.css'

export interface FormProps extends HTMLProps<HTMLFormElement> {
  onSubmit: FormEventHandler<HTMLFormElement>
  errorMessage?: string
}

export const Form: FC<FormProps> = ({ className, children, errorMessage, onSubmit, ...props }) => {
  return (
    <form
      className={classNames('form', className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
      {...props}
    >
      {errorMessage && <Alert className="errors">{errorMessage}</Alert>}
      {children}
    </form>
  )
}

export interface FormFieldProps extends InputProps {
  label: string
  id: string
  description?: string
  error?: string
}

export const FormField: FC<FormFieldProps> = ({ label, id, description, error, ...props }) => {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <div className="form-field">
      <div className="label-container">
        <label htmlFor={id}>{label}</label>
        {error && <p id={errorId}>{error}</p>}
      </div>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-errormessage={error && errorId}
        aria-describedby={description && descriptionId}
        {...props}
      />
      {description && (
        <p id={descriptionId} className="description">
          {description}
        </p>
      )}
    </div>
  )
}
