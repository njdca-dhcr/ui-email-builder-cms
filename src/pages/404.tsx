import React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { SkipNavContent } from '@reach/skip-nav'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Page not found</Heading>
          <Paragraph>Sorry 😔, we couldn’t find what you were looking for.</Paragraph>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
