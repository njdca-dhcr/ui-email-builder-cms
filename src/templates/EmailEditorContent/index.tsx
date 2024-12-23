import React, { FC, Fragment, useRef, useState } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { Alert, EmailTable, LoadingOverlay } from 'src/ui'
import { EditEmailComponent } from './EditEmailComponent'
import { EditEmailSubComponent } from './EditEmailSubComponent'
import { EditingEmailCSS } from '../emailHtmlDocument/EmailCSS'
import { EditPreviewText } from './EditPreviewText'
import { EmailComponentSpacer } from './EmailComponentSpacer'
import { EmailSubComponentSpacer } from './EmailSubComponentSpacer'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { isRestricted } from 'src/utils/appMode'
import { PreviewTextHtml } from './PreviewTextHtml'
import { Spacing } from '../styles'
import { useElementsToEmailString } from '../emailHtmlDocument/useElementsToEmailString'
import { usePreviewText } from '../PreviewText'
import { useTitleValue } from '../EmailTemplateSubComponents/Title'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import { useCurrentUser } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { EmailTemplateSaveAsDialog, EmailTemplateUpdateDialog } from './SaveEmailTemplateDialog'
import { useKeepHtmlTranslationsLinksPopulated } from 'src/network/useKeepHtmlTranslationsLinksPopulated'
import { SelectPreviewType, PreviewType } from './SelectPreviewType'
import { ExportEmailTemplate } from './ExportEmailTemplate'
import './EmailEditorContent.css'

interface Props {
  emailTemplate: EmailTemplate.Unique.Config
  emailTranslation: EmailTranslation.Unique
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate, emailTranslation }) => {
  const { data: user, isLoading, error, enabled } = useCurrentUser()
  const [previewType, setPreviewType] = useState<PreviewType>('desktop')
  const isPreviewDesktop = previewType === 'desktop'
  const isPreviewMobile = !isPreviewDesktop
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)
  const [titleValue] = useTitleValue(getSubComponentByKind(emailTranslation, 'Title'))
  const [previewText] = usePreviewText()

  const components = emailTranslation.components

  const content = (
    <>
      <VisuallyHidden>
        <h2>Email Preview</h2>
      </VisuallyHidden>
      <EditPreviewText />
      <div className="email-preview-actions">
        <SelectPreviewType previewType={previewType} onChange={setPreviewType} />
        {!isRestricted() && (
          <div className="share-and-save-buttons">
            <ExportEmailTemplate
              htmlForImage={() => toEmailText(titleValue.title)}
              emailTemplate={emailTemplate}
              emailTranslation={emailTranslation}
              previewText={previewText}
            />
            <WhenSignedIn>
              <div className="save-and-update-buttons">
                {emailTemplate.id && <EmailTemplateUpdateDialog />}
                <EmailTemplateSaveAsDialog />
              </div>
            </WhenSignedIn>
          </div>
        )}
      </div>
      <Root.div
        id="preview-container"
        className={classNames('email-preview', {
          'email-preview-desktop': isPreviewDesktop,
          'email-preview-mobile': isPreviewMobile,
        })}
      >
        <EditingEmailCSS />
        <div
          ref={previewRef as any}
          className={classNames({
            desktop: isPreviewDesktop,
            mobile: isPreviewMobile,
          })}
        >
          <PreviewTextHtml />
          <EmailTable
            role="presentation"
            maxWidth={Spacing.layout.maxWidth}
            style={{ margin: '0 auto' }}
          >
            {components.map((emailComponent, i) => (
              <Fragment key={i}>
                <EditEmailComponent emailComponent={emailComponent}>
                  {(emailComponent.subComponents ?? []).map((emailSubComponent, n) => (
                    <Fragment key={n}>
                      <EditEmailSubComponent emailSubComponent={emailSubComponent} />
                      <EmailSubComponentSpacer
                        currentSubComponent={emailSubComponent}
                        nextSubComponent={(emailComponent.subComponents ?? [])[n + 1]}
                      />
                    </Fragment>
                  ))}
                </EditEmailComponent>
                <EmailComponentSpacer
                  currentComponent={emailComponent}
                  nextComponent={components[i + 1]}
                />
              </Fragment>
            ))}
          </EmailTable>
        </div>
      </Root.div>
    </>
  )

  return (
    <>
      {error && <Alert>{error.message}</Alert>}
      {enabled && user ? (
        <UserInfoProvider userInfo={user}>
          <KeepHtmlTranslationsLinksPopulated emailTemplate={emailTemplate} />
          {content}
        </UserInfoProvider>
      ) : (
        content
      )}
      {isLoading && <LoadingOverlay description="Loading your settings" />}
    </>
  )
}

const KeepHtmlTranslationsLinksPopulated: FC<{ emailTemplate: EmailTemplate.Unique.Config }> = ({
  emailTemplate,
}) => {
  useKeepHtmlTranslationsLinksPopulated(emailTemplate)
  return null
}
