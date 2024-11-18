import classNames from 'classnames'
import React, { DetailedHTMLProps, forwardRef } from 'react'
import './Button.css'

export interface Props
  extends Omit<
    DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'ref'
  > {}

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => {
  return <button ref={ref} className={classNames('button', className)} {...props} />
})

export const ButtonLike = forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => {
  return <button ref={ref} className={classNames('button-like', className)} {...props} />
})
