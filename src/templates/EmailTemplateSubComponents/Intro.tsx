import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { EditableElement } from 'src/ui/EditableElement'
import { StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

const defaultValue =
  'You requested a waiver application for your Pandemic Unemployment Overpayment.'

const { Row } = EmailBlock

export const Intro: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row>
      <EditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Introduction"
        onClick={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onFocus={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
}
