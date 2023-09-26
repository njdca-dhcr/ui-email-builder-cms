import React, { FC, useRef, useState } from 'react'
import Root from 'react-shadow'
import capitalize from 'lodash.capitalize'
import classNames from 'classnames'
import type { EmailTemplate } from 'src/appTypes'
import { EmailTemplateFormComponent } from './emailForm/EmailTemplateFormComponent'
import { EmailCopyData } from './emailForm/EmailCopyData'
import { EmailTemplatePreviewComponent } from './emailPreview/EmailTemplatePreviewComponent'
import { CopyToClipboardButton } from '../ui/CopyToClipboardButton'
import { useElementsToEmailString } from './emailForm/useElementsToEmailString'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const TEST_IDS = {
  emailEditorContents: 'email-editor-contents',
  name: 'name',
  description: 'description',
}

const buildCopyId = ({ kind }: EmailTemplate.Component, i: number): string => {
  return `${kind}-${i}`
}

type PreviewKind = 'desktop' | 'mobile'

export const EmailEditorContents: FC<Props> = ({ emailTemplate }) => {
  const [previewKind, setPreviewKind] = useState<PreviewKind>('desktop')
  const otherPreviewKind: PreviewKind = previewKind === 'desktop' ? 'mobile' : 'desktop'
  const previewRef = useRef()
  const toEmailText = useElementsToEmailString(previewRef)

  return (
    <EmailCopyData>
      <div data-testid={TEST_IDS.emailEditorContents}>
        <h1 data-testid={TEST_IDS.name}>{emailTemplate.name}</h1>
        <p data-testid={TEST_IDS.description}>{emailTemplate.description}</p>
      </div>

      <div className="container">
        <div className="pane">
          {(emailTemplate.components ?? []).map((emailTemplateComponentItem, i) => (
            <EmailTemplateFormComponent
              key={i}
              copyId={buildCopyId(emailTemplateComponentItem, i)}
              emailTemplateComponentItem={emailTemplateComponentItem}
            />
          ))}
        </div>
        <div className="pane preview-pane">
          <h2>{capitalize(previewKind)} Preview</h2>
          <div className="preview-actions">
            <CopyToClipboardButton textToCopy={toEmailText}>
              Copy to clipboard
            </CopyToClipboardButton>
            <button onClick={() => setPreviewKind(otherPreviewKind)}>
              View on {otherPreviewKind}
            </button>
          </div>
          <Root.div className={classNames('preview', { mobile: previewKind === 'mobile' })}>
            <div ref={previewRef as any} style={{ backgroundColor: 'white' }}>
              {(emailTemplate.components ?? []).map((emailTemplateComponentItem, i) => (
                <EmailTemplatePreviewComponent
                  key={i}
                  copyId={buildCopyId(emailTemplateComponentItem, i)}
                  emailTemplateComponentItem={emailTemplateComponentItem}
                />
              ))}
            </div>
          </Root.div>
        </div>
      </div>
    </EmailCopyData>
  )
}
