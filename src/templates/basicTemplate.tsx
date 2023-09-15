import React, { FC } from 'react'
// import type {  } from 'gatsby'
import type { EmailTemplate } from '../appTypes'

interface Props {
  pageContext: {
    emailTemplate: EmailTemplate
  }
}

const BasicTemplate: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <pre>{JSON.stringify(emailTemplate, null, 2)}</pre>
    </div>
  )
}

export default BasicTemplate
