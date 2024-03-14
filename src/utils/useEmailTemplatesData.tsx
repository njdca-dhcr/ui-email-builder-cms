import { graphql, useStaticQuery } from 'gatsby'
import { AppMode, appMode } from './appMode'

const query = graphql`
  query EmailTemplatesData {
    emailTemplates: allEmailTemplatesYaml(sort: { name: ASC }) {
      edges {
        node {
          id
          name
          description
          appModes
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
  appModes: AppMode[]
}[] => {
  const { emailTemplates } = useStaticQuery<Queries.EmailTemplatesDataQuery>(query)

  return emailTemplates.edges
    .map(({ node }) => {
      return {
        id: node.id,
        name: node.name!,
        description: node.description!,
        path: `/email-templates/${(node.parent as any).name}`,
        appModes: (node.appModes ?? []) as any,
      }
    })
    .filter(({ appModes }) => appModes.includes(appMode()))
}
