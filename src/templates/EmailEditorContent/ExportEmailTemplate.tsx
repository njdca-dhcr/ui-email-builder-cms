import React, { FC } from 'react'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { ShareEmailContent } from './ShareEmailContent'
import { CopyToClipboardButton, DownloadButton, ExportImageButton } from 'src/ui'
import { useRenderEmailTranslationToString } from '../emailHtmlDocument/renderEmailTranslationToString'

interface Props {
  emailTemplate: EmailTemplate.Unique.Config
  emailTranslation: EmailTranslation.Unique
  htmlForImage: () => string
  previewText: string
}

export const ExportEmailTemplate: FC<Props> = ({
  emailTemplate,
  emailTranslation,
  htmlForImage,
  previewText,
}) => {
  const renderEmailTranslationToString = useRenderEmailTranslationToString()

  const hasPreviewText = () => {
    const text = previewText.trim()
    const readyToCopy = text.length > 0
    if (!readyToCopy) {
      alert('Please add Preview Text before exporting HTML')
    }
    return readyToCopy
  }

  return (
    <ShareEmailContent>
      <ExportImageButton html={htmlForImage} fileName={emailTemplate.name}>
        Export Image
      </ExportImageButton>
      <CopyToClipboardButton
        shouldCopy={hasPreviewText}
        textToCopy={() =>
          renderEmailTranslationToString({ emailTemplate, translation: emailTranslation })
        }
      >
        Copy HTML
      </CopyToClipboardButton>
      <DownloadButton
        textToDownload={() =>
          renderEmailTranslationToString({ emailTemplate, translation: emailTranslation })
        }
        fileName={`${emailTemplate.name}.html`}
        shouldDownload={hasPreviewText}
      >
        Download HTML
      </DownloadButton>
    </ShareEmailContent>
  )
}
