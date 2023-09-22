import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { useEmailTemplatesData } from 'src/utils/useEmailTemplatesData'
import { List } from 'src/ui/List'
import './library.css'

const LibaryPage: FC = () => {
  const emailTemplates = useEmailTemplatesData()

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Library</Heading>
          <Paragraph>Check out these templates.</Paragraph>
          <List>
            {emailTemplates.map(({ id, name, description, path }) => (
              <li key={id} className="library-item">
                <Link to={path} className="library-name">
                  {name}
                </Link>
                <p className="library-description">{description}</p>
              </li>
            ))}
          </List>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default LibaryPage

export const Head: HeadFC = () => <title>Libary</title>
