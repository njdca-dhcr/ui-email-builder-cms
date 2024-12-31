import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Header } from './Header'
import { List } from './List'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
  className?: string
  element?: 'div' | 'main'
}

export const Layout: FC<LayoutProps> = ({ children, className, element }) => {
  const Element = element ?? 'div'

  return (
    <div className={classNames('page-wrapper', className)}>
      <WhenSignedIn>
        <Header />
      </WhenSignedIn>
      <Element className="layout">{children}</Element>
    </div>
  )
}

const SKIP_TO_CONTENT = 'skip-to-content'

export const SkipNavLink: FC = () => {
  return <a href={`#${SKIP_TO_CONTENT}`}>Skip to content</a>
}

export const SkipNavContent: FC = () => {
  return <div id={SKIP_TO_CONTENT} />
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
  id?: string
}

export const Sidebar: FC<SidebarProps> = ({ children, className, id }) => {
  return (
    <div id={id} className={classNames('sidebar', className)}>
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

interface HeadingProps {
  children: ReactNode
  element: 'h1' | 'h2'
  subheading?: boolean
}

export const Heading: FC<HeadingProps> = ({ children, element, subheading }) => {
  const Element = element
  return <Element className={classNames('heading', { subheading })}>{children}</Element>
}

interface ParagraphProps {
  children: ReactNode
  className?: string
}

export const Paragraph: FC<ParagraphProps> = ({ children, className }) => {
  return <p className={classNames('paragraph', className)}>{children}</p>
}

interface SpacedContainerProps {
  children: ReactNode
}

export const SpacedContainer: FC<SpacedContainerProps> = ({ children }) => {
  return <div className="spaced-container">{children}</div>
}

interface ActionsProps {
  children: ReactNode
}

export const Actions: FC<ActionsProps> = ({ children }) => {
  return <div className="actions">{children}</div>
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
