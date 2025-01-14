import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { LoadingOverlay } from 'src/ui'
import { Layout, Sidebar, PageContent } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useCurrentUser } from 'src/network/users'
import { EditBanner, EditDepartmentSeal, EditDisclaimer, EditStateSeal } from 'src/ui/Settings'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './email.css'

const EmailSettingsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: currentUser, error, isLoading } = useCurrentUser()

  return (
    <Layout>
      <Sidebar />
      <PageContent className="email-settings">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>
            Set up your state's logos and seal. Your selections here will appear in the emails you
            create.
          </p>
        </div>

        {error && <p>{error.message}</p>}
        {currentUser && (
          <UserInfoProvider userInfo={currentUser}>
            <EditBanner />
            <EditDepartmentSeal />
            <EditStateSeal />
            <EditDisclaimer />
          </UserInfoProvider>
        )}
        {isLoading && <LoadingOverlay description="Loading email settings" />}
      </PageContent>
    </Layout>
  )
}

export default EmailSettingsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Email Settings')}</title>
