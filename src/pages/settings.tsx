import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { EditDisclaimer } from 'src/ui/Settings/EditDisclaimer'
import { EditBanner } from 'src/ui/Settings/EditBanner'
import './settings.css'

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
          <Paragraph>Setup your state's disclaimer here. More coming soon.</Paragraph>
          <div className="section-container">
            <EditBanner />
          </div>
          <div className="section-container">
            <EditDisclaimer />
          </div>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default SettingsPage

export const Head: HeadFC = () => <title>Settings</title>
