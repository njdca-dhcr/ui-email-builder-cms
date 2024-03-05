import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { RichTextEditableElement } from 'src/ui/RichTextEditableElement'
import { AdditionalContentValue, EmailTemplate } from 'src/appTypes'

const defaultValue: AdditionalContentValue = {
  content: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.',
        },
      ],
    },
  ],
}

const { Row } = EmailBlock

export const useAdditionalContentValue = (emailSubComponent: EmailTemplate.AdditionalContent) => {
  return useEmailPartsContentFor(emailSubComponent, defaultValue)
}

export const AdditionalContent: FC<EmailSubComponentProps<'AdditionalContent'>> = ({
  emailSubComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useAdditionalContentValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row
      className="additional-content"
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
    >
      <RichTextEditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Additional content"
        onValueChange={(content) => setValue({ ...value, content })}
        style={styles}
        value={value.content}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.caption.large.regular,
  color: Colors.black,
}
