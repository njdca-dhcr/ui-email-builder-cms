import React, { AriaRole, CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'

export interface EmailTableProps {
  children: ReactNode
  className?: string
  labelledBy?: string
  maxWidth?: string | number
  onClick?: MouseEventHandler<HTMLTableElement>
  role?: AriaRole
  style?: CSSProperties
  width?: 'unset' | string | number
  align?: 'left' | 'center' | 'right'
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
  align,
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
      align={align ?? 'left'}
    >
      <tbody role="presentation">{children}</tbody>
    </table>
  )
}
