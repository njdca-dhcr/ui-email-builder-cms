import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import './Button.css'

interface Props {
  children: ReactNode
  className?: string
  onClick: () => void
}

export const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={classNames('button', className)} onClick={onClick}>
      {children}
    </button>
  )
}
