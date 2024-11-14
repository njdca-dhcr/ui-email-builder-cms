import React, { FC } from 'react'
import { EmailParts } from 'src/appTypes'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { StatusFloatingControls } from './StatusFloatingControls'

interface Props {
  emailSubComponent: EmailParts.Unique.SubComponent
  nextEmailSubComponent: EmailParts.Unique.SubComponent | undefined
}

export const EmailSubComponentFloatingControls: FC<Props> = ({
  emailSubComponent,
  nextEmailSubComponent,
}) => {
  const shouldShowSubComponent = useShouldShowEmailPart(emailSubComponent)
  const shouldShowNextSubComponent = useShouldShowEmailPart(nextEmailSubComponent)

  if (shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'Status':
      return (
        nextEmailSubComponent?.kind === 'Directive' &&
        shouldShowNextSubComponent.on && (
          <StatusFloatingControls emailSubComponent={emailSubComponent as EmailParts.Status} />
        )
      )
    default:
      return null
  }
}
