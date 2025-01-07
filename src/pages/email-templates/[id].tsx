import { HeadFC, PageProps } from 'gatsby'
import React, { FC, ReactNode, useEffect } from 'react'
import { useEmailTemplate } from 'src/network/emailTemplates'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { EmailEditorSidebar } from 'src/templates/EmailEditorSidebar'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { Layout, PageContent, LoadingOverlay, Alert } from 'src/ui'
import { SyncSidebarAndPreviewScroll } from 'src/templates/SyncSidebarAndPreviewScroll'
import { PreviewText } from 'src/templates/PreviewText'
import { EmailTranslationSelector } from 'src/templates/EmailEditorSidebar/EmailTranslationSelector'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import classNames from 'classnames'
import { useCurrentUser } from 'src/network/users'
import { ExitTranslationModeButton } from 'src/templates/ExitTranslationModeButton'
import { AnimatePresence, useAnimate, usePresence, motion, HTMLMotionProps } from 'motion/react'

export type Props = PageProps<null, null, null>

const EmailTemplateShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
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
                          <EmailEditorContent
                            emailTranslation={englishTranslation}
                            emailTemplate={currentEmailTemplate}
                            currentUser={currentUser ?? { id: 'placeholder' }}
                            readOnly={inTranslationMode}
                          />
                          <AnimatePresence>
                            {inTranslationMode && (
                              <EmailPartsContent>
                                <PreviewText emailTranslation={currentTranslation}>
                                  <motion.div
                                    key="foo"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <EmailEditorContent
                                      emailTranslation={currentTranslation}
                                      emailTemplate={currentEmailTemplate}
                                      currentUser={currentUser ?? { id: 'placeholder' }}
                                    />
                                    <ExitTranslationModeButton />
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

const AnimateFriend: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 1 })
        await animate('div', { opacity: 1 }, { duration: 1 })
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate('div', { opacity: 0 }, { duration: 1 })
        await animate(scope.current, { opacity: 0 }, { duration: 1 })
        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent])

  return (
    <div ref={scope} style={{ flex: 1 }}>
      {children}
    </div>
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
