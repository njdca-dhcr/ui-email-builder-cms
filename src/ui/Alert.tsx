import React, { FC, ReactNode } from 'react'

export const Alert: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div role="alert" className={className}>
      {children}
    </div>
  )
}
