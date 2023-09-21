import React, { FC, ReactNode } from 'react'
import { SkipNavLink } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { List } from './List'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
  element?: 'div' | 'main'
}

export const Layout: FC<LayoutProps> = ({ children, element }) => {
  const Element = element ?? 'div'

  return (
    <Element className="layout">
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
  return <List className="sidebar-list">{children}</List>
}

interface SidebarListItemProps {
  children: ReactNode
}

export const SideBarListItem: FC<SidebarListItemProps> = ({ children }) => {
  return <li className="sidebar-list-item">{children}</li>
}

interface HeadingProps {
  children: ReactNode
  element: 'h1' | 'h2'
}

export const Heading: FC<HeadingProps> = ({ children, element }) => {
  const Element = element
  return <Element className="heading">{children}</Element>
}

interface ParagraphProps {
  children: ReactNode
}

export const Paragraph: FC<ParagraphProps> = ({ children }) => {
  return <p className="paragraph">{children}</p>
}

interface SpacedContainerProps {
  children: ReactNode
}

export const SpacedContainer: FC<SpacedContainerProps> = ({ children }) => {
  return <div className="spaced-container">{children}</div>
}
