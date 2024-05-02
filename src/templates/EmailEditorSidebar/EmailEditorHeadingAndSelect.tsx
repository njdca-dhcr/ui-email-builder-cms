import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { EmailTemplate } from 'src/appTypes'
import { useEmailTemplatesData } from 'src/utils/useEmailTemplatesData'
import './EmailEditorHeadingAndSelect.css'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ChevronDownIcon } from 'src/ui/ChevronDownIcon'
import { Select } from 'src/ui'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorHeadingAndSelect: FC<Props> = ({ emailTemplate }) => {
  const selectLabelId = 'template-select'
  const emailTemplates = useEmailTemplatesData().filter(({ name }) => {
    return name !== emailTemplate.name
  })

  return (
    <div className="email-editor-heading-and-select">
      <h1>{emailTemplate.name}</h1>
      <ChevronDownIcon />
      <VisuallyHidden>
        <label id={selectLabelId}>Go to</label>
      </VisuallyHidden>
      <Select
        labelId={selectLabelId}
        onChange={(value) => value && navigate(value, { replace: true })}
        options={emailTemplates.map((emailTemplate) => ({
          label: emailTemplate.name,
          value: emailTemplate.path,
        }))}
        value=""
      />
    </div>
  )
}
