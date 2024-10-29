import type { GatsbyNode } from 'gatsby'
import type { EmailTemplate } from 'src/appTypes'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const EMAIL_TEMPLATES_DIR = './content/email-templates'

const loadEmailTemplateFromYaml = (filePath: string): EmailTemplate.Base.Config => {
  const contents = fs.readFileSync(filePath, 'utf-8')
  return yaml.load(contents) as any
}

const emailTemplateComponent = path.resolve('./src/templates/EmailEditorPage.tsx')

const createPages: GatsbyNode['createPages'] = ({ actions }) => {
  const { createPage } = actions
  const filePaths = fs.readdirSync(EMAIL_TEMPLATES_DIR)

  filePaths.forEach((fileName) => {
    const filePath = `${EMAIL_TEMPLATES_DIR}/${fileName}`
    const slug = path.parse(fileName).name
    const emailTemplate = loadEmailTemplateFromYaml(filePath)

    createPage({
      path: `email-templates/${slug}`,
      component: emailTemplateComponent,
      context: { emailTemplate },
    })
  })
}

exports.createPages = createPages
