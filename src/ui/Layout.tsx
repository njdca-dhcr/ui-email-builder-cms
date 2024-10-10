import React, { FC, ReactNode } from 'react'
import { List } from './List'
import './Layout.css'
import classNames from 'classnames'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { DEPARTMENT_SEALS, departmentSealsForState } from 'src/utils/departmentSeals'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { Link, navigate } from 'gatsby'
import { StateAbbreviation, stateById } from 'src/utils/statesAndTerritories'
import { useAuth } from 'src/utils/AuthContext'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import { WhenSignedOut } from 'src/utils/WhenSignedOut'
import { OnlyWithBackendAndCognitoUrls } from 'src/utils/OnlyWithBackendUrl'

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
  return (
    <Element className={classNames('page-content', className)}>
      <AuthButtons />
      {children}
    </Element>
  )
}

interface SidebarProps {
  children: ReactNode
  className?: string
  id?: string
}

export const Sidebar: FC<SidebarProps> = ({ children, className, id }) => {
  const stateAbbreviation = appModeAsStateAbbreviation()
  const state = stateById(appModeAsStateAbbreviation() ?? 'US')
  const departmentSeal = departmentSealForState(stateAbbreviation)

  return (
    <div id={id} className={classNames('sidebar', className)}>
      <SpacedSidebarContainer>
        {departmentSeal && (
          <Link to="/" className="department-seal-container">
            <img
              alt={departmentSeal.label}
              src={buildDepartmentSealUrl(`/${departmentSeal.imageName}`)}
            />
          </Link>
        )}
        <span className="sidebar-title">
          {state && `${state.name} `}
          Email Builder (Beta)
        </span>
      </SpacedSidebarContainer>
      {children}
    </div>
  )
}

const departmentSealForState = (
  state: StateAbbreviation | null,
): (typeof DEPARTMENT_SEALS)[number] | null => {
  if (!state) return null

  const [firstDepartment] = departmentSealsForState(state)

  return firstDepartment ?? null
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

export const SignOutButton: FC = () => {
  const [_auth, setAuth] = useAuth()

  return (
    <button
      className="sign-out-button"
      onClick={() => {
        setAuth(null)
        navigate('/')
      }}
    >
      Sign Out
    </button>
  )
}

export const AuthButtons: FC = () => {
  return (
    <OnlyWithBackendAndCognitoUrls>
      <div className="auth-buttons">
        <WhenSignedOut>
          <Link to="/sign-in" className="sign-in-link">
            Sign In
          </Link>
        </WhenSignedOut>
        <WhenSignedIn>
          <SignOutButton />
        </WhenSignedIn>
      </div>
    </OnlyWithBackendAndCognitoUrls>
  )
}
