import React, { FC, useRef } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EmailTemplateSaveAsDialog, EmailTemplateUpdateDialog } from './SaveEmailTemplateDialog'
import { EditingEmailCSS } from '../emailHtmlDocument/EmailCSS'
import { EditPreviewText } from './EditPreviewText'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { isRestricted } from 'src/utils/appMode'
import { useElementsToEmailString } from '../emailHtmlDocument/useElementsToEmailString'
import { usePreviewText } from '../PreviewText'
import { useTitleValue } from '../EmailTemplateSubComponents/Title'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import { CurrentUserEmailConfig } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { SelectPreviewType, usePreviewType } from './SelectPreviewType'
import { ExportEmailTemplate } from './ExportEmailTemplate'
import { EmailBody } from '../emailHtmlDocument/EmailBody'
import './EmailEditorContent.css'

interface Props {
  emailTemplate: EmailTemplate.Unique.Config
  emailTranslation: EmailTranslation.Unique
  currentUser: CurrentUserEmailConfig
  readOnly?: boolean
}

export const EmailEditorContent: FC<Props> = ({
  emailTemplate,
  emailTranslation,
  currentUser,
  readOnly,
}) => {
  const previewType = usePreviewType()
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)
  const [titleValue] = useTitleValue(getSubComponentByKind(emailTranslation, 'Title'))
  const [previewText, setPreviewText] = usePreviewText()

  return (
    <div className="email-editor-content">
      <UserInfoProvider userInfo={currentUser}>
        <EditPreviewText value={previewText} onChange={setPreviewText} readOnly={readOnly} />
        <div className="email-preview-actions">
          <SelectPreviewType {...previewType} />
          {!isRestricted() && !readOnly && (
            <div className="share-and-save-buttons">
              <WhenSignedIn>
                {/* TODO: mock tests properly to remove WhenSignedIn (unnecessary) */}
                <div className="save-and-update-buttons">
                  {emailTemplate.id && <EmailTemplateUpdateDialog />}
                  <EmailTemplateSaveAsDialog />
                </div>
              </WhenSignedIn>
              {emailTemplate.id && (
                <ExportEmailTemplate
                  htmlForImage={() => toEmailText(titleValue.title)}
                  emailTemplate={emailTemplate}
                  emailTranslation={emailTranslation}
                  previewText={previewText}
                />
              )}
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
            className={classNames({ desktop: previewType.isDesktop, mobile: previewType.isMobile })}
          >
            <EmailBody
              previewText={previewText}
              translation={emailTranslation}
              readOnly={readOnly}
            />
          </div>
        </Root.div>
      </UserInfoProvider>
    </div>
  )
}
