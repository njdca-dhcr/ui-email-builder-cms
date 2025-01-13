import React, { FC, ReactNode } from 'react'
import { HeadFC } from 'gatsby'
import { LoadingOverlay } from 'src/ui'
import { Layout, Sidebar, PageContent } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useCurrentUser } from 'src/network/users'
import { EditBanner, EditDepartmentSeal, EditDisclaimer, EditStateSeal } from 'src/ui/Settings'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

const EmailSettingsPage: FC = () => {
  const { data: currentUser, error, isLoading } = useCurrentUser()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        {error && <p>{error.message}</p>}
        {currentUser && (
          <UserInfoProvider userInfo={currentUser}>
            <Section>
              <EditBanner />
            </Section>
            <Section>
              <EditDepartmentSeal />
            </Section>
            <Section>
              <EditStateSeal />
            </Section>
            <Section>
              <EditDisclaimer />
            </Section>
          </UserInfoProvider>
        )}
        {isLoading && <LoadingOverlay description="Loading email settings" />}
      </PageContent>
    </Layout>
  )
}

export default EmailSettingsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Email Settings')}</title>

const Section: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="">{children}</div>
}
