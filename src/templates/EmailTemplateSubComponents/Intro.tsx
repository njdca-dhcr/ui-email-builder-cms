import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text } from '../styles'
import { EmailBlock, RichTextEditableElement } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, IntroValue } from 'src/appTypes'

export const defaultIntroValue: IntroValue = {
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
  return useEmailPartsContentFor(emailSubComponent, defaultIntroValue)
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
