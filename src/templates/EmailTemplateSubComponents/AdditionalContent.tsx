import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

const defaultValue =
  'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.'

const { Row } = EmailBlock

export const AdditionalContent: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)
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
      <EditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Additional content"
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.caption.large.regular,
  color: Colors.black,
}
