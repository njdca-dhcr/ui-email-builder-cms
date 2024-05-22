import React, { FC, FormEventHandler, HTMLProps, ReactNode } from 'react'

export interface FormProps extends HTMLProps<HTMLFormElement> {
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const Form: FC<FormProps> = ({ onSubmit, ...props }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
      {...props}
    />
  )
}

export interface FormFieldProps extends HTMLProps<HTMLInputElement> {
  label: string
  id: string
}

export const FormField: FC<FormFieldProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  )
}
