import React, { FC, Fragment, useRef, useState } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EmailTemplate } from 'src/appTypes'
import { EditEmailComponent } from './EditEmailComponent'
import { EditEmailSubComponent } from './EditEmailSubComponent'
import './EmailEditorContent.css'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useElementsToEmailString } from '../emailHtmlDocument/useElementsToEmailString'
import { CopyToClipboardButton } from 'src/ui/CopyToClipboardButton'
import { EmailTable } from 'src/ui/EmailTable'
import { Spacing } from '../styles'
import { PreviewTextHtml } from './PreviewTextHtml'
import { EditingEmailCSS } from '../emailHtmlDocument/EmailCSS'
import { DownloadButton } from 'src/ui/DownloadButton'
import { EmailComponentSpacer } from './EmailComponentSpacer'
import { EmailSubComponentSpacer } from './EmailSubComponentSpacer'
import { useTitleValue } from '../EmailTemplateSubComponents/Title'
import { usePreviewText } from '../PreviewText'
import { EditPreviewText } from './EditPreviewText'
import { Radio } from 'src/ui/RadioButtons'

interface Props {
  emailTemplate: EmailTemplate.UniqueConfig
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate }) => {
  const [previewType, setPreviewType] = useState<'desktop' | 'mobile'>('desktop')
  const isPreviewDesktop = previewType === 'desktop'
  const isPreviewMobile = !isPreviewDesktop
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)
  const [titleValue] = useTitleValue(getTitleSubComponent(emailTemplate))
  const [previewText] = usePreviewText()
  const emailComponents = emailTemplate.components ?? []

  const hasPreviewText = () => {
    const text = previewText.trim()
    const readyToCopy = text.length > 0
    if (!readyToCopy) {
      alert('Please add Preview Text before exporting HTML')
    }
    return readyToCopy
  }

  return (
    <>
      <VisuallyHidden>
        <h2>Email Preview</h2>
      </VisuallyHidden>
      <EditPreviewText />
      <div className="email-preview-actions">
        <Radio.Fieldset
          className="select-preview-type"
          legend="Select preview type"
          legendId="select-preview-type"
          renderLegend={(legend) => <VisuallyHidden>{legend}</VisuallyHidden>}
        >
          <Radio.Button
            checked={isPreviewDesktop}
            label="Desktop"
            onChange={() => setPreviewType('desktop')}
          />
          <Radio.Button
            checked={isPreviewMobile}
            label="Mobile"
            onChange={() => setPreviewType('mobile')}
          />
        </Radio.Fieldset>
        <div className="button-group">
          <CopyToClipboardButton
            fieldsCompleted={hasPreviewText}
            textToCopy={() => toEmailText(titleValue.title)}
          >
            Copy HTML
          </CopyToClipboardButton>
          <DownloadButton
            textToDownload={() => toEmailText(titleValue.title)}
            fileName={`${emailTemplate.name}.html`}
            fieldsCompleted={hasPreviewText}
          >
            Download HTML
          </DownloadButton>
        </div>
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
            {emailComponents.map((emailComponent, i) => (
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
                  nextComponent={emailComponents[i + 1]}
                />
              </Fragment>
            ))}
          </EmailTable>
        </div>
      </Root.div>
    </>
  )
}

const getTitleSubComponent = (
  emailTemplate: EmailTemplate.UniqueConfig,
): EmailTemplate.Title | null => {
  const subComponents = (emailTemplate.components ?? []).flatMap(
    ({ subComponents }) => subComponents ?? [],
  )

  return (
    (subComponents.find(({ kind }) => kind === 'Title') as EmailTemplate.Title | undefined) ?? null
  )
}
