import { HeadFC, PageProps } from 'gatsby'
import React, { FC, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import {
  SelectPreviewType,
  usePreviewType,
} from 'src/templates/EmailEditorContent/SelectPreviewType'
import {
  EmailTemplateSaveAsDialog,
  EmailTemplateUpdateDialog,
} from 'src/templates/EmailEditorContent/SaveEmailTemplateDialog'
import { AnimatePresence, motion } from 'motion/react'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { EmailEditorSidebar } from 'src/templates/EmailEditorSidebar'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { EmailTranslationSelector } from 'src/templates/EmailEditorSidebar/EmailTranslationSelector'
import { ExitTranslationModeButton } from 'src/templates/ExitTranslationModeButton'
import { ExportEmailTemplate } from 'src/templates/EmailEditorContent/ExportEmailTemplate'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { Layout, PageContent, LoadingOverlay, Alert } from 'src/ui'
import { PreviewText, PreviewTextConsumer } from 'src/templates/PreviewText'
import { SyncSidebarAndPreviewScroll } from 'src/templates/SyncSidebarAndPreviewScroll'
import { useCurrentUser } from 'src/network/users'
import { useElementsToEmailString } from 'src/templates/emailHtmlDocument/useElementsToEmailString'
import { useEmailTemplate } from 'src/network/emailTemplates'
import { useKeepHtmlTranslationsLinksPopulated } from 'src/network/useKeepHtmlTranslationsLinksPopulated'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { useTitleValue } from 'src/templates/EmailTemplateSubComponents/Title'
import capitalize from 'lodash.capitalize'

export type Props = PageProps<null, null, null>

const TRANSITION_DURATION = 0.5

const EmailTemplateShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
  const previewTypeOptions = usePreviewType()
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)
  const query = useEmailTemplate(params.id)
  const { data: queriedEmailTemplate, isLoading, error } = query
  const { data: currentUser } = useCurrentUser()
  const emailTemplate = queriedEmailTemplate ?? null

  return (
    <EmailTemplateState emailTemplate={emailTemplate}>
      {({ currentLanguage, currentEmailTemplate, currentTranslation, englishTranslation }) => {
        const inTranslationMode = !['not-set', 'english'].includes(currentLanguage)

        return (
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <EmailPartsContent>
                <PreviewText emailTranslation={currentTranslation}>
                  <KeepHtmlTranslationsLinksPopulated emailTemplate={currentEmailTemplate} />
                  <Layout
                    element="main"
                    className={classNames({ 'translation-mode': inTranslationMode })}
                  >
                    <EmailEditorSidebar
                      emailTranslation={currentTranslation}
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
                            data: () => <EmailTranslationSelector />,
                            loading: () => null,
                            error: () => null,
                          })}
                        </>
                      }
                    />

                    <PageContent element="div" className="email-editor-page-content-container">
                      {error && <Alert>{error.message}</Alert>}
                      {emailTemplate && (
                        <div className="email-editors">
                          <div className="original-translation translation">
                            <AnimatePresence>
                              {inTranslationMode && (
                                <motion.div
                                  key="fade-in-translation"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'fit-content' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: TRANSITION_DURATION }}
                                >
                                  <TranslationActions title="English (original)">
                                    <ExitTranslationModeButton label="Edit Original Email" />
                                  </TranslationActions>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <EmailEditorContent
                              emailTranslation={englishTranslation}
                              emailTemplate={currentEmailTemplate}
                              currentUser={currentUser ?? { id: 'placeholder' }}
                              readOnly={inTranslationMode}
                              preview={previewTypeOptions.current}
                              actions={
                                inTranslationMode ? null : (
                                  <>
                                    <SelectPreviewType {...previewTypeOptions} />
                                    <div className="share-and-save-buttons">
                                      <div className="save-and-update-buttons">
                                        <EmailTemplateUpdateDialog groups={currentUser?.groups} />
                                        <EmailTemplateSaveAsDialog groups={currentUser?.groups} />
                                      </div>
                                      <TitleAndPreviewText translation={englishTranslation}>
                                        {({ previewText, title }) => (
                                          <ExportEmailTemplate
                                            emailTemplate={currentEmailTemplate}
                                            emailTranslation={englishTranslation}
                                            htmlForImage={() => toEmailText(title)}
                                            previewText={previewText}
                                          />
                                        )}
                                      </TitleAndPreviewText>
                                    </div>
                                  </>
                                )
                              }
                            />
                          </div>
                          <AnimatePresence>
                            {inTranslationMode && (
                              <EmailPartsContent>
                                <PreviewText emailTranslation={currentTranslation}>
                                  <motion.div
                                    key="fade-in-translation"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: TRANSITION_DURATION }}
                                    className="new-translation translation"
                                  >
                                    <TranslationActions title={capitalize(currentLanguage)}>
                                      <SelectPreviewType {...previewTypeOptions} />
                                      <div className="share-and-save-buttons">
                                        <div className="save-and-update-buttons">
                                          <EmailTemplateUpdateDialog groups={currentUser?.groups} />
                                          <EmailTemplateSaveAsDialog groups={currentUser?.groups} />
                                        </div>
                                        <TitleAndPreviewText translation={englishTranslation}>
                                          {({ previewText, title }) => (
                                            <ExportEmailTemplate
                                              emailTemplate={currentEmailTemplate}
                                              emailTranslation={englishTranslation}
                                              htmlForImage={() => toEmailText(title)}
                                              previewText={previewText}
                                            />
                                          )}
                                        </TitleAndPreviewText>
                                      </div>
                                    </TranslationActions>

                                    <EmailEditorContent
                                      emailTranslation={currentTranslation}
                                      emailTemplate={currentEmailTemplate}
                                      currentUser={currentUser ?? { id: 'placeholder' }}
                                      actions={null}
                                      preview={previewTypeOptions.current}
                                    />
                                  </motion.div>
                                </PreviewText>
                              </EmailPartsContent>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </PageContent>
                    {isLoading && <LoadingOverlay description="Loading your email template" />}
                  </Layout>
                </PreviewText>
              </EmailPartsContent>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        )
      }}
    </EmailTemplateState>
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

const KeepHtmlTranslationsLinksPopulated: FC<{ emailTemplate: EmailTemplate.Unique.Config }> = ({
  emailTemplate,
}) => {
  useKeepHtmlTranslationsLinksPopulated(emailTemplate)
  return null
}

const TitleAndPreviewText: FC<{
  translation: EmailTranslation.Unique
  children: (props: { title: string; previewText: string }) => ReactNode
}> = ({ children, translation }) => {
  const [titleValue] = useTitleValue(getSubComponentByKind(translation, 'Title'))

  return (
    <PreviewTextConsumer>
      {([previewText]) => children({ title: titleValue.title, previewText })}
    </PreviewTextConsumer>
  )
}

const TranslationActions: FC<{ children: ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="translation-actions">
      <div className="translation-actions-inner">
        <h2>{title}</h2>
        <div className="actions">{children}</div>
      </div>
    </div>
  )
}
