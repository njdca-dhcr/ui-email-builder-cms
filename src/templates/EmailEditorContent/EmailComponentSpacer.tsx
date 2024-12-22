import React, { FC } from 'react'
import { EmailParts } from 'src/appTypes'
import { EmailBlock } from 'src/ui'
import { SpacingCell } from '../styles'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'

interface Props {
  currentComponent: EmailParts.Unique.Component
  nextComponent: EmailParts.Unique.Component | undefined
}

export const EmailComponentSpacer: FC<Props> = ({ currentComponent, nextComponent }) => {
  const shouldShow = useShouldShowEmailPart(currentComponent)
  const shouldShowNext = useShouldShowEmailPart(nextComponent)

  if (shouldShow.off) return null

  const size = sizeForComponent(currentComponent.kind, nextComponent?.kind, shouldShowNext.on)

  if (!size) return null

  return (
    <EmailBlock.Row className={`spacer-${size}`}>
      <SpacingCell size={size} />
    </EmailBlock.Row>
  )
}

const sizeForComponent = (
  componentKind: EmailParts.Kinds.Component,
  nextComponentKind: EmailParts.Kinds.Component | undefined,
  shouldShowNext: boolean,
): 'medium' | 'extraLarge' | undefined => {
  switch (componentKind) {
    case 'Banner':
      switch (nextComponentKind) {
        case 'TranslationLinks':
          return shouldShowNext ? undefined : 'extraLarge'
        default:
          return 'extraLarge'
      }
    case 'Header':
    case 'StateSeal':
    case 'TranslationLinks':
      return 'extraLarge'
    case 'Name':
    case 'Footer':
      return 'medium'
  }
}
