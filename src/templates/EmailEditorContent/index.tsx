import React, { FC, useRef, useState } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EmailTemplate } from 'src/appTypes'
import { EditEmailComponent } from './EditEmailComponent'
import { EditEmailSubComponent } from './EditEmailSubComponent'
import './EmailEditorContent.css'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useElementsToEmailString } from '../emailHtmlDocument/useElementsToEmailString'
import { CopyToClipboardButton } from '../../ui/CopyToClipboardButton'
import { EmailTable } from 'src/ui/EmailTable'
import { Spacing } from '../styles'
import { PreviewTextHtml } from './PreviewTextHtml'
import { EditingEmailCSS, EmailCSS } from '../emailHtmlDocument/EmailCSS'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate }) => {
  const [previewType, setPreviewType] = useState<'desktop' | 'mobile'>('desktop')
  const isPreviewDesktop = previewType === 'desktop'
  const isPreviewMobile = !isPreviewDesktop
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)

  return (
    <>
      <VisuallyHidden>
        <h2>Email Preview</h2>
      </VisuallyHidden>
      <div className="email-preview-actions">
        <fieldset>
          <VisuallyHidden>
            <legend>Select preview type</legend>
          </VisuallyHidden>
          <label>
            Desktop
            <VisuallyHidden>
              <input
                type="radio"
                onChange={() => setPreviewType('desktop')}
                checked={isPreviewDesktop}
              />
            </VisuallyHidden>
          </label>
          <label>
            Mobile
            <VisuallyHidden>
              <input
                type="radio"
                onChange={() => setPreviewType('mobile')}
                checked={isPreviewMobile}
              />
            </VisuallyHidden>
          </label>
        </fieldset>
        <CopyToClipboardButton className="copy-html-button" textToCopy={toEmailText}>
          Copy HTML
        </CopyToClipboardButton>
      </div>
      <Root.div
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
          <EmailTable maxWidth={Spacing.layout.maxWidth}>
            {(emailTemplate.components ?? []).map((emailComponent, i) => (
              <EditEmailComponent key={i} emailComponent={emailComponent} id={`${i}`}>
                {(emailComponent.subComponents ?? []).map((emailSubComponent, n) => (
                  <EditEmailSubComponent
                    key={n}
                    componentId={`${i}`}
                    id={`${n}`}
                    emailSubComponent={emailSubComponent}
                  />
                ))}
              </EditEmailComponent>
            ))}
          </EmailTable>
        </div>
      </Root.div>
    </>
  )
}
