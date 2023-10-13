import React, { FC, ReactNode } from 'react'
import { SkipNavLink } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { List } from './List'
import './Layout.css'
import classNames from 'classnames'

interface LayoutProps {
  children: ReactNode
  element?: 'div' | 'main'
  singleScroll?: boolean
}

export const Layout: FC<LayoutProps> = ({ children, element, singleScroll }) => {
  const Element = element ?? 'div'

  return (
    <Element className={classNames('layout', { 'single-scroll': singleScroll })}>
      <SkipNavLink />
      {children}
    </Element>
  )
}

interface PageContentProps {
  children: ReactNode
  className?: string
  element?: 'div' | 'main'
}

export const PageContent: FC<PageContentProps> = ({ children, className, element }) => {
  const Element = element ?? 'div'
  return <Element className={classNames('page-content', className)}>{children}</Element>
}

interface SidebarProps {
  children: ReactNode
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ children, className }) => {
  return (
    <div className={classNames('sidebar', className)}>
      <SpacedSidebarContainer>
        <span className="sidebar-title">Email Builder (Beta)</span>
      </SpacedSidebarContainer>
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
  className?: string
}

export const SideBarListItem: FC<SidebarListItemProps> = ({ children, className }) => {
  return <li className={classNames('sidebar-list-item', className)}>{children}</li>
}

interface SideBarListItemBottomProps {
  children: ReactNode
}

export const SideBarListItemBottom: FC<SideBarListItemBottomProps> = ({ children }) => {
  return <SideBarListItem className="sidebar-list-item-bottom">{children}</SideBarListItem>
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

interface SpacedSidebarContainerProps {
  children: ReactNode
  className?: string
}

export const SpacedSidebarContainer: FC<SpacedSidebarContainerProps> = ({
  children,
  className,
}) => {
  return <div className={classNames('spaced-sidebar-container', className)}>{children}</div>
}
