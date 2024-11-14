import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text } from '../styles'
import { EmailBlock, RichTextEditableElement } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailParts } from 'src/appTypes'

const { Row } = EmailBlock

export const useIntroValue = (emailSubComponent: EmailParts.Intro) => {
  return useEmailPartsContentFor(emailSubComponent)
}

export const Intro: FC<EmailSubComponentProps<'Intro'>> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useIntroValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row className="intro">
      <RichTextEditableElement
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
        onValueChange={(intro) => setValue({ ...value, intro })}
        style={styles}
        value={value.intro}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
}
