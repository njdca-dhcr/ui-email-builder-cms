import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { navigate, PageProps, type HeadFC } from 'gatsby'
import uniqueId from 'lodash.uniqueid'
import { Layout, PageContent } from 'src/ui'
import type { EmailParts, EmailTemplate } from 'src/appTypes'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { currentTimestamp } from 'src/utils/currentTimestamp'
import { EmailEditorContent } from './EmailEditorContent'
import { EmailEditorHeadingAndSelect } from './EmailEditorSidebar/EmailEditorHeadingAndSelect'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailPartsContent } from './EmailPartsContent'
import { EmailTemplateSaveAsDialog } from './EmailEditorContent/SaveEmailTemplateDialog'
import {
  EmailTemplateState,
  useCurrentEmailTemplate,
  useCurrentLanguage,
  useCurrentTranslation,
} from 'src/utils/EmailTemplateState'
import { EmailTranslationSelector } from './EmailEditorSidebar/EmailTranslationSelector'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { PreviewText } from './PreviewText'
import { SelectPreviewType, usePreviewType } from './EmailEditorContent/SelectPreviewType'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import { useCurrentUser } from 'src/network/users'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'motion/react'
import { ExitTranslationModeButton } from './ExitTranslationModeButton'
import { createPortal } from 'react-dom'
import { TranslationModeHeader } from './TranslationModeHeader'
import capitalize from 'lodash.capitalize'
import { addOrRemoveTranslationLinks } from 'src/utils/addOrRemoveTranslationLinks'
import './EmailEditorPage.css'

interface PageContext {
  emailTemplate: EmailTemplate.Base.Config
}

type Props = PageProps<object, PageContext, {}>

const TRANSITION_DURATION = 0.75

const EmailEditorPage: FC<Props> = ({ pageContext, location }) => {
  useRedirectIfNotSignedIn()

  const searchParams = new URLSearchParams(location.search)
  const addTranslationByDefault = searchParams.has('add-translation')

  const previewTypeOptions = usePreviewType()
  const { data: currentUser } = useCurrentUser()
  const beforeLayoutRef = useRef()
  const [emailTemplateConfig] = useState<EmailTemplate.Unique.Config>(() => ({
    ...pageContext.emailTemplate,
    versionTimestamp: currentTimestamp(),
    translations: (pageContext.emailTemplate.translations ?? []).map((translation) => ({
      ...translation,
      components: addIds(translation.components),
    })),
  }))

  return (
    <EmailTemplateState emailTemplate={emailTemplateConfig}>
      {({
        currentLanguage,
        currentEmailTemplate,
        currentTranslation,
        englishTranslation,
        setCurrentEmailTemplate,
      }) => {
        const inTranslationMode = !['not-set', 'english'].includes(currentLanguage)

        const handleExit = () => {
          if (addTranslationByDefault) {
            navigate(location.pathname, { replace: true })
            const [translation, ..._otherTranslations] = currentEmailTemplate.translations ?? []
            setCurrentEmailTemplate(
              addOrRemoveTranslationLinks({ ...currentEmailTemplate, translations: [translation] }),
            )
          }
        }

        return (
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <EmailPartsContent>
                <TranslationModeByDefault translationModeByDefault={addTranslationByDefault} />
                <PreviewText emailTranslation={currentTranslation}>
                  <Layout
                    element="main"
                    className={classNames({ 'translation-mode': inTranslationMode })}
                  >
                    <div ref={beforeLayoutRef as any} />
                    <EmailEditorSidebar
                      linkBackTo="/library"
                      emailTranslation={currentTranslation}
                      heading={
                        <>
                          <EmailEditorHeadingAndSelect emailTemplate={currentEmailTemplate} />
                          <EmailTranslationSelector />
                        </>
                      }
                    />
                    <PageContent element="div" className="email-editor-page-content-container">
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
                                  <ExitTranslationModeButton
                                    label="Edit Original Email"
                                    forceWarning
                                    onExit={handleExit}
                                  />
                                </TranslationActions>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <EmailEditorContent
                            actions={
                              inTranslationMode ? null : (
                                <>
                                  <SelectPreviewType {...previewTypeOptions} />
                                  <div className="share-and-save-buttons">
                                    <div className="save-and-update-buttons">
                                      <EmailTemplateSaveAsDialog groups={currentUser?.groups} />
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            emailTemplate={currentEmailTemplate}
                            readOnly={inTranslationMode}
                            emailTranslation={englishTranslation}
                            currentUser={currentUser ?? { id: 'placeholder' }}
                            preview={previewTypeOptions.current}
                          />
                        </div>
                        <AnimatePresence>
                          {inTranslationMode && (
                            <EmailPartsContent>
                              <PreviewText emailTranslation={currentTranslation}>
                                {createPortal(
                                  <motion.div
                                    key="fade-in-translation-mode-header"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: TRANSITION_DURATION }}
                                  >
                                    <TranslationModeHeader
                                      forceWarning
                                      previewType={previewTypeOptions.current}
                                      onPreviewTypeChange={previewTypeOptions.onChange}
                                      onExit={handleExit}
                                    />
                                  </motion.div>,
                                  beforeLayoutRef.current as any,
                                )}
                                <motion.div
                                  key="fade-in-translation"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: TRANSITION_DURATION }}
                                  className="new-translation translation"
                                >
                                  <TranslationActions title={capitalize(currentLanguage)}>
                                    <div className="share-and-save-buttons">
                                      <div className="save-and-update-buttons">
                                        <EmailTemplateSaveAsDialog groups={currentUser?.groups} />
                                      </div>
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
                    </PageContent>
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

export default EmailEditorPage

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{formatPageTitle(name)}</title>
}

const addIds = (components: EmailParts.Base.Component[]): EmailParts.Unique.Component[] => {
  return components.map(({ subComponents, ...emailComponent }) => {
    return {
      ...emailComponent,
      id: uniqueId(`component_${emailComponent.kind}_`),
      subComponents: addIdsToSubComponents(subComponents ?? []),
    }
  })
}

const addIdsToSubComponents = (
  subComponents: EmailParts.Base.SubComponent[],
): EmailParts.Unique.SubComponent[] => {
  return subComponents.map((subComponent) => {
    return {
      ...subComponent,
      id: uniqueId(`sub_component_${subComponent.kind}_`),
    }
  })
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

const TranslationModeByDefault: FC<{ translationModeByDefault: boolean }> = ({
  translationModeByDefault,
}) => {
  const [_currentLanguage, setCurrentLanguage] = useCurrentLanguage()
  const [currentEmailTemplate, setCurrentEmailTemplate] = useCurrentEmailTemplate()
  const translations = currentEmailTemplate.translations ?? []
  const currentTranslation = useCurrentTranslation()
  const language = 'spanish'

  useEffect(() => {
    if (translationModeByDefault) {
      setCurrentEmailTemplate(
        addOrRemoveTranslationLinks({
          ...currentEmailTemplate,
          translations: [...translations, { ...currentTranslation, language }],
        }),
      )
      setCurrentLanguage(language)
    }
  }, [])

  return null
}
