import React, { FC, FormEventHandler, HTMLProps, TextareaHTMLAttributes } from 'react'
import { Input, InputProps } from './Input'
import classNames from 'classnames'
import { Alert } from './Alert'
import './Form.css'
import { Textarea, TextareaProps } from './Textarea'
import { PasswordInput } from './PasswordInput'

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
      <FormErrorMessage errorMessage={errorMessage} />
      {children}
    </form>
  )
}

export interface FormErrorMessageProps {
  errorMessage: string | undefined
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ errorMessage }) => {
  return errorMessage && <Alert className="errors">{errorMessage}</Alert>
}

export interface FormFieldProps extends InputProps {
  label: string
  id: string
  description?: string
  error?: string
}

export const FormField: FC<FormFieldProps> = ({
  label,
  id,
  description,
  error,
  type,
  ...props
}) => {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`
  const InputKind = type === 'password' ? PasswordInput : Input

  return (
    <div className="form-field">
      <div className="label-container">
        <label htmlFor={id}>{label}</label>
        {error && <p id={errorId}>{error}</p>}
      </div>
      <InputKind
        id={id}
        aria-invalid={!!error}
        aria-errormessage={error && errorId}
        aria-describedby={description && descriptionId}
        type={type}
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

export interface FormFieldAreaProps extends TextareaProps {
  label: string
  id: string
  description?: string
  error?: string
}

export const FormFieldArea: FC<FormFieldAreaProps> = ({
  label,
  id,
  description,
  error,
  ...props
}) => {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <div className="form-field">
      <div className="label-container">
        <label htmlFor={id}>{label}</label>
        {error && <p id={errorId}>{error}</p>}
      </div>
      <Textarea
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
