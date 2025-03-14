import React, { Children, FC, forwardRef, ReactElement, ReactNode, useState } from 'react'
import { HeadFC, Link } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import {
  BlackButton,
  Heading,
  Layout,
  IndexList,
  IndexListItem,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { useEmailTemplates } from 'src/network/emailTemplates'
import { DestroyEmailTemplate } from 'src/ui/DestroyDialog'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './my-drafts.css'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useDidMount } from 'src/utils/useDidMount'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import classNames from 'classnames'

const MyDraftsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const [showGroups, setShowGroups] = useState(false)
  const [groupFilters, setGroupFilters] = useState<string[]>([])
  const { data, isLoading, error } = useEmailTemplates()

  const userEmailTemplates = data?.user ?? []
  const groups = data?.groups ?? []

  const currentTemplates = [
    ...(showGroups ? [] : userEmailTemplates),
    ...groups
      .filter((group) => groupFilters.length === 0 || groupFilters.includes(group.id))
      .flatMap((group) => group.templates),
  ].sort((a, b) => a.name.localeCompare(b.name))

  const handleGroupFilterClick = (groupId: string) => {
    if (groupFilters.includes(groupId)) {
      setGroupFilters(groupFilters.filter((id) => id !== groupId))
    } else {
      setGroupFilters([...groupFilters, groupId])
    }
  }

  return (
    <Layout element="div">
      <Sidebar className="main-nav-sidebar">
        <SidebarNavigation />
      </Sidebar>
      <PageContent className="my-drafts-page" element="main">
        <SkipNavContent />
        <SpacedContainer>
          <div className="my-drafts-header">
            <Heading element="h1">My Drafts</Heading>
            <div>
              <NewDraftMenu>
                <MenuLink to="/email-templates/blank-slate/">Blank</MenuLink>
                <MenuLink to="/email-templates/everything-bagel/">Everything</MenuLink>
                <MenuLink to="/library">Select from template</MenuLink>
              </NewDraftMenu>
            </div>
          </div>
          <Paragraph className="my-drafts-page-description">
            All of your saved templates can be found here
          </Paragraph>
          <div className="draft-filters">
            <ol className="draft-view-types">
              <DraftsViewRadioButton
                checked={!showGroups}
                label="All"
                onChange={() => {
                  setShowGroups(false)
                }}
              />
              <DraftsViewRadioButton
                checked={showGroups}
                label="Your Groups"
                onChange={() => {
                  setShowGroups(true)
                }}
              />
            </ol>
            {showGroups && (
              <ol className="draft-group-filters">
                {data?.groups.map((group) => (
                  <GroupFilterCheckbox
                    label={group.name}
                    checked={groupFilters.includes(group.id)}
                    groupId={group.id}
                    key={group.id}
                    onChange={() => handleGroupFilterClick(group.id)}
                  />
                ))}
              </ol>
            )}
          </div>
          {error && <Paragraph>{error.message}</Paragraph>}
          {currentTemplates.length > 0 ? (
            <IndexList>
              {currentTemplates.map((emailTemplate) => (
                <IndexListItem key={emailTemplate.id}>
                  <div className="draft-info">
                    <div className="draft-name-container">
                      <Link to={`/email-templates/${emailTemplate.id}`} className="draft-name">
                        {emailTemplate.name}
                      </Link>
                    </div>
                    <p className="draft-description">{emailTemplate.description}</p>
                  </div>
                  <DestroyEmailTemplate emailTemplate={emailTemplate} />
                </IndexListItem>
              ))}
            </IndexList>
          ) : (
            <Paragraph className="my-drafts-empty-message">
              Make your first draft using the New Draft button above
            </Paragraph>
          )}

          {isLoading && <LoadingOverlay description="Loading your email templates" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default MyDraftsPage

export const Head: HeadFC = () => <title>{formatPageTitle('My Drafts')}</title>

const MenuLink = forwardRef<HTMLAnchorElement, { to: string; children: ReactNode }>(
  ({ children, to, ...props }, ref) => {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  },
)

interface NewDraftMenuProps {
  children: (ReactElement | null | boolean)[]
}

const NewDraftMenu: FC<NewDraftMenuProps> = ({ children }) => {
  const mounted = useDidMount()

  if (!mounted) return null

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <BlackButton aria-label="New Draft">
          New Draft <span>+</span>
        </BlackButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="new-draft-menu-buttons" sideOffset={5} align="end">
          {Children.map(children, (child) => (
            <DropdownMenu.Item asChild className="new-draft-menu-item">
              {child}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const DraftsViewRadioButton: FC<{
  className?: string
  checked: boolean
  label: string
  onChange: () => void
}> = ({ label, checked, onChange }) => {
  const id = label.toLowerCase()

  return (
    <li className={classNames({ checked })}>
      <label htmlFor={id}>
        {label}
        <VisuallyHidden>
          <input id={id} type="radio" checked={checked} onChange={onChange} />
        </VisuallyHidden>
      </label>
    </li>
  )
}

const GroupFilterCheckbox: FC<{
  label: string
  checked: boolean
  onChange: () => void
  groupId: string
}> = ({ label, checked, groupId, onChange }) => {
  return (
    <li className="group-filter">
      <label htmlFor={`groupId-${groupId}`}>
        {label}
        <VisuallyHidden>
          <input id={`groupId-${groupId}`} type="checkbox" checked={checked} onChange={onChange} />
        </VisuallyHidden>
      </label>
    </li>
  )
}
