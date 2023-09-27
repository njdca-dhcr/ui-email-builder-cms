import React, { CSSProperties, FC, Fragment, MouseEventHandler, ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  width?: 'unset' | string | number
  maxWidth?: string | number
}

interface EmailTableProps extends BaseProps {
  onClick?: MouseEventHandler<HTMLTableElement>
  noBody?: boolean
  style?: CSSProperties
}

export const EmailTable: FC<EmailTableProps> = ({
  children,
  noBody,
  maxWidth,
  onClick,
  style,
  width,
}) => {
  const Wrapper = noBody ? Fragment : 'tbody'
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      onClick={onClick}
      width={width ?? '100%'}
      style={{ ...defaultStyles, ...style, maxWidth }}
    >
      <Wrapper>{children}</Wrapper>
    </table>
  )
}

// These don't really do anything in the emails, but they help in the browser
const defaultStyles: CSSProperties = {
  margin: 0,
  padding: 0,
}

interface TableAndCellProps extends BaseProps {
  onClick?: MouseEventHandler<HTMLTableCellElement>
  style?: CSSProperties
}

export const TableAndCell: FC<TableAndCellProps> = ({ children, onClick, style, ...props }) => {
  return (
    <EmailTable {...props}>
      <tr>
        <td onClick={onClick} style={style}>
          {children}
        </td>
      </tr>
    </EmailTable>
  )
}
