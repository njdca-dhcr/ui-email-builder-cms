import React, { FC, useCallback } from 'react'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { ShareEmailContent } from './ShareEmailContent'
import { CopyToClipboardButton, DownloadButton, ExportImageButton } from 'src/ui'
import { useRenderEmailTranslationToString } from '../emailHtmlDocument/renderEmailTranslationToString'
import { useTranslationHasChanges } from './SaveEmailTemplateDialog/useTranslationHasChanges'

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
  const translationHasChanges = useTranslationHasChanges()

  const hasPreviewText = useCallback(() => {
    const text = previewText.trim()
    const readyToCopy = text.length > 0

    if (!readyToCopy) {
      alert('Please add Preview Text before exporting HTML')
    }
    return readyToCopy
  }, [previewText])

  const hasNoUnsavedChanges = useCallback(() => {
    if (translationHasChanges) {
      alert('Please update before exporting HTML')
    }

    return !translationHasChanges
  }, [translationHasChanges])

  const shouldExport = useCallback(
    () => hasPreviewText() && hasNoUnsavedChanges(),
    [hasNoUnsavedChanges, hasPreviewText],
  )

  return (
    <ShareEmailContent>
      <ExportImageButton html={htmlForImage} fileName={emailTemplate.name}>
        Export Image
      </ExportImageButton>
      <CopyToClipboardButton
        shouldCopy={shouldExport}
        textToCopy={() =>
          renderEmailTranslationToString({ emailTemplate, translation: emailTranslation })
        }
      >
        Copy HTML
      </CopyToClipboardButton>
      <DownloadButton
        fileName={`${emailTemplate.name}.html`}
        shouldDownload={shouldExport}
        textToDownload={() =>
          renderEmailTranslationToString({ emailTemplate, translation: emailTranslation })
        }
      >
        Download HTML
      </DownloadButton>
    </ShareEmailContent>
  )
}
