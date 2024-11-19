import { HeadFC, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { useEmailTemplate } from 'src/network/emailTemplates'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { EmailEditorSidebar } from 'src/templates/EmailEditorSidebar'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { Layout, PageContent, LoadingOverlay, Alert } from 'src/ui'
import { SyncSidebarAndPreviewScroll } from 'src/templates/SyncSidebarAndPreviewScroll'
import { PreviewText } from 'src/templates/PreviewText'
import { CurrentLanguage } from 'src/templates/CurrentLanguage'
import { EmailTranslationSelector } from 'src/templates/EmailEditorSidebar/EmailTranslationSelector'

export type Props = PageProps<null, null, null>

const EmailTemplateShowPage: FC<Props> = ({ params }) => {
  const query = useEmailTemplate(params.id)
  const { data: queriedEmailTemplate, isLoading, error } = useEmailTemplate(params.id)
  const emailTemplateConfig = queriedEmailTemplate ?? { name: '', id: '' }

  return (
    <Layout element="main">
      <EmailTemplateConfig key={emailTemplateConfig.id} emailTemplateConfig={emailTemplateConfig}>
        {(emailTemplate) => (
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <CurrentLanguage key={emailTemplate.id} emailTemplateConfig={emailTemplate}>
                {([language]) => (
                  <EmailPartsContent key={language}>
                    <EmailEditorSidebar
                      language={language}
                      emailTemplate={emailTemplate}
                      heading={
                        <>
                          <h1
                            style={{
                              fontSize: '1.5rem',
                              paddingLeft: '0.5rem',
                              marginTop: '0.75rem',
                              marginBottom: 0,
                            }}
                          >
                            {byQueryState(query, {
                              data: ({ name }) => name,
                              loading: () => 'Loading...',
                              error: () => 'Something went wrong',
                            })}
                          </h1>
                          {byQueryState(query, {
                            data: () => (
                              <EmailTranslationSelector emailTemplateConfig={emailTemplate} />
                            ),
                            loading: () => null,
                            error: () => null,
                          })}
                        </>
                      }
                    />
                    <PreviewText
                      key={language}
                      emailTemplateConfig={emailTemplate}
                      language={language}
                    >
                      <PageContent element="div" className="email-editor-page-content">
                        {error && <Alert>{error.message}</Alert>}
                        {emailTemplate && (
                          <EmailEditorContent language={language} emailTemplate={emailTemplate} />
                        )}
                      </PageContent>
                    </PreviewText>
                    {isLoading && <LoadingOverlay description="Loading your email template" />}
                  </EmailPartsContent>
                )}
              </CurrentLanguage>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        )}
      </EmailTemplateConfig>
    </Layout>
  )
}

const byQueryState = <T extends any, L, E, D>(
  queryState: { data: T; isLoading: boolean; error: Error | null },
  options: { loading: () => L; error: (error: Error) => E; data: (data: NonNullable<T>) => D },
): L | E | D => {
  if (queryState.isLoading) {
    return options.loading()
  } else if (queryState.error) {
    return options.error(queryState.error)
  } else if (queryState.data) {
    return options.data(queryState.data)
  } else {
    throw new Error('No data or error and not loading')
  }
}

export default EmailTemplateShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('Email Template')}</title>
