import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { StatusFloatingControls } from './StatusFloatingControls'

interface Props {
  emailSubComponent: EmailTemplate.UniqueSubComponent
  nextEmailSubComponent: EmailTemplate.UniqueSubComponent | undefined
}

export const EmailSubComponentFloatingControls: FC<Props> = ({
  emailSubComponent,
  nextEmailSubComponent,
}) => {
  const shouldShowSubComponent = useShouldShowEmailPart(emailSubComponent.id)
  const shouldShowNextSubComponent = useShouldShowEmailPart(nextEmailSubComponent?.id ?? '')

  if (shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'Status':
      return (
        nextEmailSubComponent?.kind === 'Directive' &&
        shouldShowNextSubComponent.on && (
          <StatusFloatingControls emailSubComponent={emailSubComponent} />
        )
      )
    default:
      return null
  }
}
