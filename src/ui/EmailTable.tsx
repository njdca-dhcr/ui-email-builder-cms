import React, { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'

interface EmailTableProps {
  children: ReactNode
  className?: string
  maxWidth?: string | number
  onClick?: MouseEventHandler<HTMLTableElement>
  style?: CSSProperties
  width?: 'unset' | string | number
}

export const EmailTable: FC<EmailTableProps> = ({
  children,
  className,
  maxWidth,
  onClick,
  style,
  width,
}) => {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className={className}
      border={0}
      onClick={onClick}
      width={width ?? '100%'}
      style={{ ...style, maxWidth }}
    >
      <tbody>{children}</tbody>
    </table>
  )
}
