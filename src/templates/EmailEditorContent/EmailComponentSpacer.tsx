import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { EmailBlock } from 'src/ui'
import { SpacingCell } from '../styles'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'

interface Props {
  currentComponent: EmailTemplate.Unique.Component
  nextComponent: EmailTemplate.Unique.Component | undefined
}

export const EmailComponentSpacer: FC<Props> = ({ currentComponent }) => {
  const shouldShow = useShouldShowEmailPart(currentComponent.id)

  if (shouldShow.off) return null

  const size = sizeForComponent(currentComponent.kind)

  if (!size) return null

  return (
    <EmailBlock.Row className={`spacer-${size}`}>
      <SpacingCell size={size} />
    </EmailBlock.Row>
  )
}

const sizeForComponent = (
  componentKind: EmailTemplate.Kinds.Component,
): 'medium' | 'extraLarge' | undefined => {
  switch (componentKind) {
    case 'Banner':
    case 'Header':
    case 'StateSeal':
      return 'extraLarge'
    case 'Name':
    case 'Footer':
      return 'medium'
  }
}
