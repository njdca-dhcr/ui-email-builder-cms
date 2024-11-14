import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, Spacing, StyleDefaults, Text } from '../styles'
import { EmailBlock, EditableElement } from 'src/ui'
import { textColorForBackground } from 'src/utils/textColorForBackground'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailParts, EmailTemplate } from 'src/appTypes'

const { Table, Row } = EmailBlock

export const useProgramNameValue = (emailSubComponent: EmailParts.ProgramName) => {
  return useEmailPartsContentFor(emailSubComponent)
}

export const ProgramName: FC<EmailSubComponentProps<'ProgramName'>> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useProgramNameValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const color = textColorForBackground(value.backgroundColor, {
    dark: Colors.black,
    light: Colors.white,
  })

  return (
    <Row
      className="program-name"
      elements={[
        {
          part: 'cell',
          style: StyleDefaults.inline.colors,
          className: StyleDefaults.layout.narrow,
        },
      ]}
    >
      <Table width="unset" elements={['row']}>
        <EditableElement
          valueKey={value.preset}
          ref={previewRef}
          aria-level={2}
          element="td"
          label="Program name"
          onClick={(event) => {
            activate(event)
            scrollSidebar()
          }}
          onFocus={(event) => {
            activate(event)
            scrollSidebar()
          }}
          onValueChange={(name) => setValue({ ...value, name })}
          role="heading"
          style={{ ...styles, color, backgroundColor: value.backgroundColor }}
          value={value.name}
        />
      </Table>
    </Row>
  )
}

const styles: CSSProperties = {
  ...Text.header.h6.bold,
  borderRadius: '3px',
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
