import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { EditDisclaimer, EditBanner, EditStateSeal, EditDepartmentSeal } from 'src/ui/Settings'
import './settings.css'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { EditingEmailCSS } from 'src/templates/emailHtmlDocument/EmailCSS'

const SettingsPage: FC = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <div className="settings-header-and-forms">
            <div className="heading-container">
              <Heading element="h1">Settings</Heading>
              <Paragraph>
                Set up your state's logos and seal. Your selections here will appear in the emails
                you create.
              </Paragraph>
            </div>

            <div className="section-container">
              <EditBanner />
            </div>

            <div className="section-container">
              <EditDepartmentSeal />
            </div>
            <div className="section-container">
              <EditStateSeal />
            </div>
            <div className="section-container">
              <EditDisclaimer />
            </div>
          </div>
        </SpacedContainer>
      </PageContent>
      <EditingEmailCSS />
    </Layout>
  )
}

export default SettingsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Settings')}</title>
