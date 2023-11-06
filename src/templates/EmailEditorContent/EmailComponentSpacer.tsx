import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { EmailBlock } from 'src/ui'
import { SpacingCell } from '../styles'
import { useShouldShowEmailComponent } from '../ShouldShowEmailPart'

interface Props {
  currentComponent: EmailTemplate.Component
  id: string
  nextComponent: EmailTemplate.Component | undefined
}

export const EmailComponentSpacer: FC<Props> = ({ currentComponent, id }) => {
  const shouldShow = useShouldShowEmailComponent(id)

  if (shouldShow.off) return null

  const size = sizeForComponent(currentComponent.kind)

  if (!size) return null

  return (
    <EmailBlock.Row>
      <SpacingCell size={size} />
    </EmailBlock.Row>
  )
}

const sizeForComponent = (
  componentKind: EmailTemplate.ComponentKind,
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
