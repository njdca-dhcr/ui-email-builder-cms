import React, { FC, MutableRefObject, ReactNode } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EditingEmailCSS } from '../emailHtmlDocument/EmailCSS'
import { EditPreviewText } from './EditPreviewText'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { usePreviewText } from '../PreviewText'
import { CurrentUserEmailConfig } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { PreviewType } from './SelectPreviewType'
import { EmailBody } from '../emailHtmlDocument/EmailBody'
import './EmailEditorContent.css'

export interface Props {
  emailTemplate: EmailTemplate.Unique.Config
  emailTranslation: EmailTranslation.Unique
  currentUser: CurrentUserEmailConfig
  readOnly?: boolean
  preview: PreviewType
  actions: ReactNode
  emailPreviewRef?: MutableRefObject<any>
}

export const EmailEditorContent: FC<Props> = ({
  actions,
  emailTranslation,
  currentUser,
  readOnly,
  preview,
  emailPreviewRef,
}) => {
  const [previewText, setPreviewText] = usePreviewText()

  const previewDesktop = preview === 'desktop'
  const previewMobile = preview === 'mobile'

  return (
    <div className="email-editor-content">
      <UserInfoProvider userInfo={currentUser}>
        <EditPreviewText value={previewText} onChange={setPreviewText} readOnly={readOnly} />
        <div className="email-preview-actions">
          {actions && <div className="email-preview-actions-inner">{actions}</div>}
        </div>
        <Root.div
          className={classNames('email-preview', {
            'email-preview-desktop': previewDesktop,
            'email-preview-mobile': previewMobile,
          })}
        >
          <EditingEmailCSS />
          <div
            ref={emailPreviewRef}
            className={classNames({ desktop: previewDesktop, mobile: previewMobile })}
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
