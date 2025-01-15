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

export const BlackButton = forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => {
  return <button ref={ref} className={classNames('black-button', className)} {...props} />
})

export const WhiteButton = forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => {
  return <button ref={ref} className={classNames('white-button', className)} {...props} />
})
