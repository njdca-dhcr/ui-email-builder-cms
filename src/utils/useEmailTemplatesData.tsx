import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query EmailTemplatesData {
    emailTemplates: allEmailTemplatesYaml(sort: { name: ASC }) {
      edges {
        node {
          id
          name
          description
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

export const useEmailTemplatesData = (): {
  id: string
  name: string
  description: string
  path: string
}[] => {
  const { emailTemplates } = useStaticQuery<Queries.EmailTemplatesDataQuery>(query)

  return emailTemplates.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name!,
      description: node.description!,
      path: `/email-templates/${(node.parent as any).name}`,
    }
  })
}
