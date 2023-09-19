import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query EmailTemplatesData {
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

export const useEmailTemplatesData = (): { id: string; name: string; slug: string }[] => {
  const { emailTemplates } = useStaticQuery<Queries.EmailTemplatesDataQuery>(query)

  return emailTemplates.edges.map(({ node }) => {
    return { id: node.id, name: node.name!, slug: (node.parent as any).name }
  })
}
