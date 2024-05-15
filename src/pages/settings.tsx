import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { EditDisclaimer, EditBanner, EditStateSeal, EditDepartmentSeal } from 'src/ui/Settings'
import './settings.css'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { EditingEmailCSS } from 'src/templates/emailHtmlDocument/EmailCSS'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { useUser } from 'src/network/useUser'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

const SettingsPage: FC = () => {
  const { data: user, isLoading, error, enabled } = useUser()

  const forms = (
    <>
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
    </>
  )

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

            {error && <Paragraph>{error.message}</Paragraph>}

            {enabled && user ? <UserInfoProvider userInfo={user}>{forms}</UserInfoProvider> : forms}
          </div>
          {isLoading && <LoadingOverlay description="Loading your settings" />}
        </SpacedContainer>
      </PageContent>
      <EditingEmailCSS />
    </Layout>
  )
}

export default SettingsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Settings')}</title>
