import React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import {
  Heading,
  NewLayout,
  PageContent,
  Paragraph,
  Sidebar,
  SpacedContainer,
} from 'src/ui/NewLayout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { SkipNavContent } from '@reach/skip-nav'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <NewLayout element="div">
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
    </NewLayout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
