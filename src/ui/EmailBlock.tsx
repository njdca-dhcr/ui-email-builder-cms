import React, { AriaRole, CSSProperties, FC, MouseEventHandler, ReactNode } from 'react'
import { EmailTable } from './EmailTable'

type ElementShorthand = 'table' | 'row' | 'cell'

interface BaseConfig {
  className?: string
  condition?: boolean
  elements?: Array<NonNullable<TableConfig | RowConfig | CellConfig | ElementShorthand>>
  labelledBy?: string
  onClick?: MouseEventHandler<HTMLElement>
  role?: AriaRole
  style?: CSSProperties
}

interface TableConfig extends BaseConfig {
  part: 'table'
  width?: 'unset' | string | number
  maxWidth?: string | number
  align?: 'left' | 'center' | 'right'
}

interface RowConfig extends BaseConfig {
  part: 'row'
}

interface CellConfig extends BaseConfig {
  part: 'cell'
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
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
    const safeCurrent =
      typeof current === 'string' ? { part: current, labelledBy: undefined } : current
    const { part, labelledBy, ...rest } = safeCurrent
    switch (safeCurrent.part) {
      case 'table':
        return (
          <EmailTable
            role="presentation"
            labelledBy={labelledBy}
            {...(rest as Partial<TableConfig>)}
          >
            {previous}
          </EmailTable>
        )
      case 'row':
        return (
          <tr role="presentation" aria-labelledby={labelledBy} {...rest}>
            {previous}
          </tr>
        )
      case 'cell':
        return (
          <td role="presentation" aria-labelledby={labelledBy} {...rest}>
            {previous}
          </td>
        )
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

interface LinkProps {
  children: ReactNode
  labelledBy?: string
  style?: CSSProperties
  to: string
}

const Link: FC<LinkProps> = ({ children, labelledBy, style, to }) => {
  return (
    <a
      aria-labelledby={labelledBy}
      href={to}
      rel="noopener noreferrer"
      style={style}
      target="_blank"
    >
      {children}
    </a>
  )
}
Link.displayName = 'EmailBlock.Link'

export const EmailBlock = { Base, Table, Row, Cell, Link }
