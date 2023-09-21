import React, { FC, ReactNode } from 'react'
import { SkipNavLink } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import './Layout.css'

interface NewLayoutProps {
  children: ReactNode
  element?: 'div' | 'main'
}

export const NewLayout: FC<NewLayoutProps> = ({ children, element }) => {
  const Element = element ?? 'div'

  return (
    <Element className="new-layout">
      <SkipNavLink />
      {children}
    </Element>
  )
}

interface PageContentProps {
  children: ReactNode
  element?: 'div' | 'main'
}

export const PageContent: FC<PageContentProps> = ({ children, element }) => {
  const Element = element ?? 'div'
  return <Element className="page-content">{children}</Element>
}

interface SidebarProps {
  children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <div className="sidebar">
      <span className="sidebar-title">Email Builder (Beta)</span>
      {children}
    </div>
  )
}

interface SidebarListProps {
  children: ReactNode
}

export const SideBarList: FC<SidebarListProps> = ({ children }) => {
  return <ul className="sidebar-list">{children}</ul>
}

interface SidebarListItemProps {
  children: ReactNode
}

export const SideBarListItem: FC<SidebarListItemProps> = ({ children }) => {
  return <li className="sidebar-list-item">{children}</li>
}
