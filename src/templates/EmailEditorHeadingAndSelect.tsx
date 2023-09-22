import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { useId } from '@reach/auto-id'
import { EmailTemplate } from 'src/appTypes'
import { useEmailTemplatesData } from 'src/utils/useEmailTemplatesData'
import './EmailEditorHeadingAndSelect.css'
import { VisuallyHidden } from '@reach/visually-hidden'
import { ChevronDownIcon } from 'src/ui/ChevronDownIcon'

interface Props {
  emailTemplate: EmailTemplate
}

export const EmailEditorHeadingAndSelect: FC<Props> = ({ emailTemplate }) => {
  const selectId = useId('template-select')
  const emailTemplates = useEmailTemplatesData().filter(({ name }) => {
    return name !== emailTemplate.name
  })

  return (
    <div className="email-editor-heading-and-select">
      <h1>{emailTemplate.name}</h1>
      <ChevronDownIcon />
      <VisuallyHidden>
        <label htmlFor={selectId}>Go to</label>
      </VisuallyHidden>
      <select
        id={selectId}
        onChange={(event) => {
          const value = event.currentTarget.value
          const selectedEmailTemplate = emailTemplates.find(({ name }) => name === value)
          selectedEmailTemplate && navigate(selectedEmailTemplate.path)
        }}
      >
        <option />
        {emailTemplates.map((emailTemplate, i) => (
          <option key={i}>{emailTemplate.name}</option>
        ))}
      </select>
    </div>
  )
}
