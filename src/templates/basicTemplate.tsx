import React, { FC } from 'react'
import { Link } from 'gatsby'

interface Props {
  pageContext: {
    emailTemplate: any
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
