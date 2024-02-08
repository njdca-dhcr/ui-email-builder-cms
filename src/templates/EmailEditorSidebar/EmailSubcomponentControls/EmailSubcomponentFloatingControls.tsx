import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { StatusFloatingControls } from './StatusFloatingControls'

interface Props {
  emailSubComponent: EmailTemplate.UniqueSubComponent
}

export const EmailSubComponentFloatingControls: FC<Props> = ({ emailSubComponent }) => {
  const shouldShowSubComponent = useShouldShowEmailPart(emailSubComponent.id)

  if (shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'Status':
      return <StatusFloatingControls emailSubComponent={emailSubComponent} />
    default:
      return null
  }
}
