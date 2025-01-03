import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text } from '../styles'
import { EmailBlock, EditableElement } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailParts } from 'src/appTypes'

const { Row } = EmailBlock

export const useTitleValue = (emailSubComponent: EmailParts.Title | null) => {
  const title: EmailParts.Title = emailSubComponent ?? { id: '', kind: 'Title' }
  return useEmailPartsContentFor(title)
}

export const Title: FC<EmailSubComponentProps<'Title'>> = ({ emailSubComponent, readOnly }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useTitleValue(emailSubComponent)
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
        onValueChange={(title) => setValue({ ...value, title })}
        readOnly={readOnly}
        style={styles}
        value={value.title}
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
