import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import {
  Heading,
  NewLayout,
  PageContent,
  Paragraph,
  Sidebar,
  SpacedContainer,
} from 'src/ui/NewLayout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const TipsAndTricksPage: FC = () => {
  return (
    <NewLayout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Tips & Tricks</Heading>
          <Paragraph>Coming soon.</Paragraph>
        </SpacedContainer>
      </PageContent>
    </NewLayout>
  )
}

export default TipsAndTricksPage

export const Head: HeadFC = () => <title>Tips & Tricks</title>
