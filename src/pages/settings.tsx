import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const SettingsPage: FC = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Settings</Heading>
          <Paragraph>Coming soon.</Paragraph>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default SettingsPage

export const Head: HeadFC = () => <title>Settings</title>
