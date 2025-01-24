import React, { FC, ReactNode } from 'react'
import './IndexList.css'

interface Props {
  children: ReactNode
}

export const IndexList: FC<Props> = ({ children }) => {
  return <ul className="index-page-list">{children}</ul>
}

interface IndexListItemProps {
  children: ReactNode
}

export const IndexListItem: FC<IndexListItemProps> = ({ children }) => {
  return <li className="index-page-list-item">{children}</li>
}
