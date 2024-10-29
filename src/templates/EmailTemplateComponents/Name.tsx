import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EmailBlock, EditableElement } from 'src/ui'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Font, StyleDefaults, Text } from '../styles'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { NameValue } from 'src/appTypes'

export const defaultNameValue: NameValue = { name: 'FIRST LAST NAME:' }

const { Row } = EmailBlock

export const Name: FC<EmailComponentProps<'Name'>> = ({ emailComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const [value, setValue] = useEmailPartsContentFor(emailComponent, defaultNameValue)
  const { scrollSidebar, previewRef } = useSyncSidebarAndPreviewScroll(emailComponent.id)
  return (
    <Row className="name">
      <EditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Recipient's name"
        onClick={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onFocus={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onValueChange={(name) => setValue({ ...value, name })}
        style={styles}
        value={value.name}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
  fontFamily: Font.family.serifMonospace,
  fontWeight: Font.weight.boldLight,
  textTransform: 'uppercase',
}
