import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { SpacingCell } from '../styles'
import { EmailBlock } from 'src/ui'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'

interface Props {
  currentSubComponent: EmailTemplate.UniqueSubComponent
  nextSubComponent: EmailTemplate.UniqueSubComponent | undefined
}

export const EmailSubComponentSpacer: FC<Props> = ({ currentSubComponent, nextSubComponent }) => {
  const emailTemplate = useEmailTemplateConfig()
  const shouldShow = useShouldShowEmailPart(currentSubComponent.id)
  const shouldShowNext = useShouldShowEmailPart(nextSubComponent?.id ?? '')
  const shouldShowDirective = useShouldShowEmailPart(
    getSubComponentByKind(emailTemplate, 'Directive')?.id ?? '',
  )

  if (shouldShow.off) return null

  const size = sizeForSubComponentKind(
    currentSubComponent.kind,
    nextSubComponent?.kind,
    shouldShowNext.on,
    shouldShowDirective.on,
  )

  if (!size) return null

  return (
    <EmailBlock.Row className={`spacer-${size}`}>
      <SpacingCell size={size} />
    </EmailBlock.Row>
  )
}

const sizeForSubComponentKind = (
  subComponentKind: EmailTemplate.SubComponentKind,
  nextSubComponentKind: EmailTemplate.SubComponentKind | undefined,
  shouldShowNext: boolean,
  shouldShowDirective: boolean,
): 'medium' | 'large' | 'extraLarge' | undefined => {
  switch (subComponentKind) {
    case 'Directive':
    case 'InformationalBox':
    case 'LoginDetails':
    case 'RulesRightsRegulations':
    case 'SupplementalContent':
      return 'extraLarge'
    case 'Title':
      return shouldShowNext ? 'medium' : undefined
    case 'Intro':
      return 'medium'
    case 'DepartmentSeal':
      return 'large'
    case 'ProgramName':
      return nextSubComponentKind && shouldShowNext && shouldShowDirective ? 'medium' : undefined
  }
}
