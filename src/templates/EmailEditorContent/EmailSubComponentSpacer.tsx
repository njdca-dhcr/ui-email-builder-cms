import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { SpacingCell } from '../styles'
import { EmailBlock } from 'src/ui'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'

interface Props {
  currentSubComponent: EmailTemplate.UniqueSubComponent
  nextSubComponent: EmailTemplate.UniqueSubComponent | undefined
}

export const EmailSubComponentSpacer: FC<Props> = ({ currentSubComponent, nextSubComponent }) => {
  const shouldShow = useShouldShowEmailPart(currentSubComponent.id)
  const shouldShowNext = useShouldShowEmailPart(nextSubComponent?.id ?? '')

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
      return shouldShowNext ? 'large' : undefined
    case 'Intro':
      return 'medium'
    case 'SupplementalContent':
      return nextSubComponentKind === 'SupplementalContent' && shouldShowNext
        ? 'large'
        : 'extraLarge'
  }
}
