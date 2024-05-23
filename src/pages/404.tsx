import React, { FC } from 'react'
import { HeadFC, PageProps } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'

const NotFoundPage: FC<PageProps> = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Page not found</Heading>
          <Paragraph>Sorry 😔, we couldn't find what you were looking for.</Paragraph>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>{formatPageTitle('Not found')}</title>
