import React, { AriaRole, CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'

interface EmailTableProps {
  children: ReactNode
  className?: string
  labelledBy?: string
  maxWidth?: string | number
  onClick?: MouseEventHandler<HTMLTableElement>
  role?: AriaRole
  style?: CSSProperties
  width?: 'unset' | string | number
}

export const EmailTable: FC<EmailTableProps> = ({
  children,
  className,
  labelledBy,
  maxWidth,
  onClick,
  role,
  style,
  width,
}) => {
  return (
    <table
      aria-labelledby={labelledBy}
      border={0}
      cellPadding={0}
      cellSpacing={0}
      className={className}
      onClick={onClick}
      role={role}
      style={{ ...style, maxWidth }}
      width={width ?? '100%'}
    >
      <tbody role="presentation">{children}</tbody>
    </table>
  )
}
