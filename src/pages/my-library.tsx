import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import {
  Heading,
  Layout,
  List,
  ListItem,
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

const MyLibraryPage: FC = () => {
  useRedirectIfNotSignedIn()
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
              {emailTemplates.map((emailTemplate) => (
                <ListItem key={emailTemplate.id} className="library-item">
                  <div className="library-name-container">
                    <Link to={`/email-templates/${emailTemplate.id}`} className="library-name">
                      {emailTemplate.name}
                    </Link>
                    <DestroyEmailTemplate emailTemplate={emailTemplate} />
                  </div>
                  <p className="library-description">{emailTemplate.description}</p>
                </ListItem>
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
