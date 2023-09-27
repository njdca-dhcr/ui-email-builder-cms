import React, { CSSProperties, FC, ReactNode } from 'react'

interface EmailTableProps {
  children: ReactNode
  style?: CSSProperties
  width?: string | number
}

export const EmailTable: FC<EmailTableProps> = ({ children, style, width }) => {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      width={width ?? '100%'}
      style={{ ...defaultStyles, ...style }}
    >
      {children}
    </table>
  )
}

const defaultStyles: CSSProperties = {
  margin: 0,
  padding: 0,
}
