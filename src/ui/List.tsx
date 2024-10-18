import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import './List.css'

interface Props {
  children: ReactNode
  className?: string
}

export const List: FC<Props> = ({ children, className }) => {
  return <ul className={classNames('list', className)}>{children}</ul>
}

interface ListItemProps {
  children: ReactNode
  className?: string
}

export const ListItem: FC<ListItemProps> = ({ children, className }) => {
  return <li className={classNames('list-item', className)}>{children}</li>
}
