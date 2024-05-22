import classNames from 'classnames'
import React, { DetailedHTMLProps, FC } from 'react'
import './Button.css'

export interface Props
  extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: FC<Props> = ({ className, ...props }) => {
  return <button className={classNames('button', className)} {...props} />
}
