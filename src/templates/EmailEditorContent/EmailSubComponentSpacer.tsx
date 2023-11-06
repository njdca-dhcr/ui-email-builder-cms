import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { SpacingCell } from '../styles'
import { EmailBlock } from 'src/ui'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'

interface Props {
  id: string
  nextId: string | undefined
  componentId: string
  currentSubComponent: EmailTemplate.SubComponent
  nextSubComponent: EmailTemplate.SubComponent | undefined
}

export const EmailSubComponentSpacer: FC<Props> = ({
  currentSubComponent,
  nextSubComponent,
  componentId,
  id,
  nextId,
}) => {
  const shouldShow = useShouldShowEmailSubComponent(componentId, id)
  const shouldShowNext = useShouldShowEmailSubComponent(componentId, nextId ?? '')

  if (shouldShow.off) return null

  const size = sizeForSubComponentKind(
    currentSubComponent.kind,
    nextSubComponent?.kind,
    shouldShowNext.on,
  )

  if (!size) return null

  return (
    <EmailBlock.Row>
      <SpacingCell size={size} />
    </EmailBlock.Row>
  )
}

const sizeForSubComponentKind = (
  subComponentKind: EmailTemplate.SubComponentKind,
  nextSubComponentKind: EmailTemplate.SubComponentKind | undefined,
  shouldShowNext: boolean,
): 'medium' | 'large' | 'extraLarge' | undefined => {
  switch (subComponentKind) {
    case 'BenefitAmount':
    case 'Directive':
    case 'LoginDetails':
    case 'RulesRightsRegulations':
      return 'extraLarge'
    case 'Title':
      return 'large'
    case 'Intro':
      return 'medium'
    case 'SupplementalContent':
      return nextSubComponentKind === 'SupplementalContent' && shouldShowNext
        ? 'large'
        : 'extraLarge'
  }
}
