import React, { FC } from 'react'
import { Link } from 'gatsby'
import { useEmailTemplatesData } from '../utils/useEmailTemplatesData'

export const TEST_ID = 'navigation'

export const Navigation: FC = () => {
  const emailTemplates = useEmailTemplatesData()

  return (
    <nav data-testid={TEST_ID}>
      <ul>
        {emailTemplates.map(({ id, name, slug }) => (
          <li key={id}>
            <Link to={`/email-templates/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
