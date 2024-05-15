import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui/Layout'
import { List } from 'src/ui'
import { useEmailTemplates } from 'src/network/useEmailTemplates'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'

const MyLibraryPage: FC = () => {
  const { data: emailTemplates, isLoading, error } = useEmailTemplates()

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">My Library</Heading>
          <Paragraph>All of your saved templates can be found here</Paragraph>
          {error && <Paragraph>{error.message}</Paragraph>}
          {emailTemplates && emailTemplates.length > 0 && (
            <List className="library-list">
              {emailTemplates.map(({ id, name, description }) => (
                <li key={id} className="library-item">
                  <Link to={`/email-template/${id}`} className="library-name">
                    {name}
                  </Link>
                  <p className="library-description">{description}</p>
                </li>
              ))}
            </List>
          )}
          {emailTemplates && emailTemplates.length === 0 && !isLoading && (
            <Paragraph className="library-empty-message">
              Looks like you don't have any saved templates yet, why not start with a template from
              the <Link to="/library">Library</Link>?
            </Paragraph>
          )}
          {isLoading && <LoadingOverlay description="Loading your email templates" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default MyLibraryPage

export const Head: HeadFC = () => <title>{formatPageTitle('My Libary')}</title>
