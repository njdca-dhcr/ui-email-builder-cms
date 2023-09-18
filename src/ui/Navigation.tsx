import React, { FC } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export const TEST_ID = 'navigation'

const query = graphql`
  query Navigation {
    emailTemplates: allEmailTemplatesYaml(sort: { name: ASC }) {
      edges {
        node {
          id
          name
          parent {
            id
            ... on File {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const Navigation: FC = () => {
  const { emailTemplates } = useStaticQuery<Queries.NavigationQuery>(query)
  return (
    <nav data-testid={TEST_ID}>
      <ul>
        {emailTemplates.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={`/email-templates/${(node.parent as any).name}`}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
