import React, { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  width?: 'unset' | string | number
  maxWidth?: string | number
}

interface EmailTableProps extends BaseProps {
  onClick?: MouseEventHandler<HTMLTableElement>
  style?: CSSProperties
}

export const EmailTable: FC<EmailTableProps> = ({ children, maxWidth, onClick, style, width }) => {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      onClick={onClick}
      width={width ?? '100%'}
      style={{ ...defaultStyles, ...style, maxWidth }}
    >
      <tbody>{children}</tbody>
    </table>
  )
}

// These don't really do anything in the emails, but they help in the browser
const defaultStyles: CSSProperties = {
  margin: 0,
  padding: 0,
}
