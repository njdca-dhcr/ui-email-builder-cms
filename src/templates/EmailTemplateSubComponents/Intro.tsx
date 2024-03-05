import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { RichTextEditableElement } from 'src/ui/RichTextEditableElement'
import { EmailTemplate, IntroValue } from 'src/appTypes'

const defaultValue: IntroValue = {
  intro: [
    {
      type: 'paragraph',
      children: [
        { text: 'You requested a waiver application for your Pandemic Unemployment Overpayment.' },
      ],
    },
  ],
}

const { Row } = EmailBlock

export const useIntroValue = (emailSubComponent: EmailTemplate.Intro) => {
  return useEmailPartsContentFor(emailSubComponent, defaultValue)
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
