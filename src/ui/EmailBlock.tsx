import React, { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'
import { EmailTable } from './EmailTable'

type ElementShorthand = 'table' | 'row' | 'cell'

interface BaseConfig {
  condition?: boolean
  elements?: Array<NonNullable<TableConfig | RowConfig | CellConfig | ElementShorthand>>
  onClick?: MouseEventHandler<HTMLElement>
  style?: CSSProperties
}

interface TableConfig extends BaseConfig {
  part: 'table'
  width?: 'unset' | string | number
  maxWidth?: string | number
}

interface RowConfig extends BaseConfig {
  part: 'row'
}

interface CellConfig extends BaseConfig {
  part: 'cell'
}

interface EmailPartProps {
  children: ReactNode
  condition?: boolean
  elements: Array<NonNullable<TableConfig | RowConfig | CellConfig | ElementShorthand>>
}

const Base: FC<EmailPartProps> = ({ children, condition: givenCondition, elements }) => {
  const condition = givenCondition ?? true
  if (!condition) return null

  return elements.reverse().reduce((previous, current) => {
    const safeCurrent = typeof current === 'string' ? { part: current } : current
    const { part, ...rest } = safeCurrent
    switch (safeCurrent.part) {
      case 'table':
        return <EmailTable {...rest}>{previous}</EmailTable>
      case 'row':
        return <tr {...rest}>{previous}</tr>
      case 'cell':
        return <td {...rest}>{previous}</td>
    }
  }, children)
}
Base.displayName = 'EmailBlock.Base'

interface TableProps extends Omit<TableConfig, 'part'> {
  children: ReactNode
}

const Table: FC<TableProps> = ({ children, condition, elements, ...props }) => {
  return (
    <Base elements={[{ part: 'table', ...props }, ...(elements ?? [])]} condition={condition}>
      {children}
    </Base>
  )
}
Table.displayName = 'EmailBlock.Table'

interface RowProps extends Omit<RowConfig, 'part'> {
  children: ReactNode
}

const Row: FC<RowProps> = ({ children, condition, elements, ...props }) => {
  return (
    <Base elements={[{ part: 'row', ...props }, ...(elements ?? [])]} condition={condition}>
      {children}
    </Base>
  )
}
Row.displayName = 'EmailBlock.Row'

interface CellProps extends Omit<CellConfig, 'part'> {
  children: ReactNode
}

const Cell: FC<CellProps> = ({ children, condition, elements, ...props }) => {
  return (
    <Base elements={[{ part: 'cell', ...props }, ...(elements ?? [])]} condition={condition}>
      {children}
    </Base>
  )
}
Cell.displayName = 'EmailBlock.Cell'

export const EmailBlock = { Base, Table, Row, Cell }
