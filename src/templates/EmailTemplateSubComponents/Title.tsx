import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

const defaultValue = 'Title'

const { Row } = EmailBlock

export const useTitleValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

export const Title: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useTitleValue(emailSubComponent.id)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row
      className="title"
      elements={[
        'cell',
        'table',
        'row',
        { part: 'cell', style: cellContainerStyles, className: StyleDefaults.layout.narrow },
      ]}
    >
      <EditableElement
        ref={previewRef}
        element="h1"
        label="Title"
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

const cellContainerStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
}

const styles: CSSProperties = {
  ...Text.header.h1.bold,
  lineHeight: 1.2,
  margin: 0,
  padding: 0,
}
