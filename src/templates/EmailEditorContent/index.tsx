import React, { FC, useRef } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { Alert, LoadingOverlay } from 'src/ui'
import { EditingEmailCSS } from '../emailHtmlDocument/EmailCSS'
import { EditPreviewText } from './EditPreviewText'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { isRestricted } from 'src/utils/appMode'
import { useElementsToEmailString } from '../emailHtmlDocument/useElementsToEmailString'
import { usePreviewText } from '../PreviewText'
import { useTitleValue } from '../EmailTemplateSubComponents/Title'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import { useCurrentUser } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { EmailTemplateSaveAsDialog, EmailTemplateUpdateDialog } from './SaveEmailTemplateDialog'
import { useKeepHtmlTranslationsLinksPopulated } from 'src/network/useKeepHtmlTranslationsLinksPopulated'
import { SelectPreviewType, usePreviewType } from './SelectPreviewType'
import { ExportEmailTemplate } from './ExportEmailTemplate'
import { EmailBody } from '../emailHtmlDocument/EmailBody'
import './EmailEditorContent.css'

interface Props {
  emailTemplate: EmailTemplate.Unique.Config
  emailTranslation: EmailTranslation.Unique
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate, emailTranslation }) => {
  const { data: user, isLoading, error, enabled } = useCurrentUser()
  const previewType = usePreviewType()
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)
  const [titleValue] = useTitleValue(getSubComponentByKind(emailTranslation, 'Title'))
  const [previewText, setPreviewText] = usePreviewText()

  const content = (
    <>
      <VisuallyHidden>
        <h2>Email Preview</h2>
      </VisuallyHidden>
      <EditPreviewText value={previewText} onChange={setPreviewText} />
      <div className="email-preview-actions">
        <SelectPreviewType {...previewType} />
        {!isRestricted() && (
          <div className="share-and-save-buttons">
            {emailTemplate.id && (
              <ExportEmailTemplate
                htmlForImage={() => toEmailText(titleValue.title)}
                emailTemplate={emailTemplate}
                emailTranslation={emailTranslation}
                previewText={previewText}
              />
            )}
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
          'email-preview-desktop': previewType.isDesktop,
          'email-preview-mobile': previewType.isMobile,
        })}
      >
        <EditingEmailCSS />
        <div
          ref={previewRef as any}
          className={classNames({
            desktop: previewType.isDesktop,
            mobile: previewType.isMobile,
          })}
        >
          <EmailBody previewText={previewText} translation={emailTranslation} />
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
