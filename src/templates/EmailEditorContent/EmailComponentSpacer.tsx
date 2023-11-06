import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { EmailBlock } from 'src/ui'
import { SpacingCell } from '../styles'

interface Props {
  currentComponent: EmailTemplate.Component
  nextComponent: EmailTemplate.Component | undefined
}

export const EmailComponentSpacer: FC<Props> = ({ currentComponent }) => {
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
): 'medium' | 'large' | undefined => {
  switch (componentKind) {
    case 'Banner':
    case 'Header':
    case 'StateSeal':
      return 'large'
    case 'Name':
    case 'Footer':
      return 'medium'
  }
}
