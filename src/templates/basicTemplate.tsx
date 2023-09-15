import React, { FC } from 'react'
import type { EmailTemplate } from '../appTypes'
import { EmailTemplateComponent } from './components/EmailTemplateComponent'

interface Props {
  pageContext: {
    emailTemplate: EmailTemplate
  }
}

export const TEST_IDS = {
  name: 'name',
  description: 'description',
}

const BasicTemplate: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <div>
        <h1 data-testid={TEST_IDS.name}>{emailTemplate.name}</h1>
        <p data-testid={TEST_IDS.description}>{emailTemplate.description}</p>
      </div>

      <div>
        {emailTemplate.components.map((emailTemplateComponentItem, i) => (
          <EmailTemplateComponent key={i} emailTemplateComponentItem={emailTemplateComponentItem} />
        ))}
      </div>

      {process.env.NODE_ENV === 'development' && (
        <pre>{JSON.stringify(emailTemplate, null, 2)}</pre>
      )}
    </div>
  )
}

export default BasicTemplate
