import React, { FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'


const { Row, Cell, Link } = EmailBlock

interface LoginDetailsValue {
  loginInformationIcon: UswdsIconVariantKey
}

const defaultValue: LoginDetailsValue = {
  loginInformationIcon: 'LockOpen',
}

export const InformationalBox: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  return (
    <div>
      <h1>InformationalBox</h1>
    </div>
  )
}