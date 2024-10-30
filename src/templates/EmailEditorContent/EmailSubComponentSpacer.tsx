import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { SpacingCell } from '../styles'
import { EmailBlock } from 'src/ui'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'

interface Props {
  currentSubComponent: EmailTemplate.Unique.SubComponent
  nextSubComponent: EmailTemplate.Unique.SubComponent | undefined
}

export const EmailSubComponentSpacer: FC<Props> = ({ currentSubComponent, nextSubComponent }) => {
  const emailTemplate = useEmailTemplateConfig()
  const shouldShow = useShouldShowEmailPart(currentSubComponent)
  const shouldShowNext = useShouldShowEmailPart(nextSubComponent ?? { kind: 'Banner', id: '' })
  const shouldShowDirective = useShouldShowEmailPart(
    getSubComponentByKind(emailTemplate, 'Directive') ?? { kind: 'Directive', id: '' },
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
  subComponentKind: EmailTemplate.Kinds.SubComponent,
  nextSubComponentKind: EmailTemplate.Kinds.SubComponent | undefined,
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
