import React, { FC } from 'react'
import { EmailParts } from 'src/appTypes'
import { EmailBlock } from 'src/ui'
import { SpacingCell } from '../styles'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'

interface Props {
  currentComponent: EmailParts.Unique.Component
  nextComponent: EmailParts.Unique.Component | undefined
}

export const EmailComponentSpacer: FC<Props> = ({ currentComponent }) => {
  const shouldShow = useShouldShowEmailPart(currentComponent)

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
  componentKind: EmailParts.Kinds.Component,
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
