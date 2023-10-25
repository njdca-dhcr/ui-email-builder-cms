import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { EditDisclaimer, EditBanner, StateSealSelect } from 'src/ui/Settings'

import './settings.css'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { EditDepartmentSeal } from 'src/ui/Settings/EditDepartmentSeal'

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

          <div className="section-container">
            <StateSealSelect />
          </div>

          <div className="section-container">
            <EditDepartmentSeal />
          </div>
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

export const Head: HeadFC = () => <title>{formatPageTitle('Settings')}</title>
