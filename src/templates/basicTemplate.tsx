import React, { FC } from 'react'
import Root from 'react-shadow'
import type { EmailTemplate, EmailTemplateComponentItem } from 'src/appTypes'
import { EmailTemplateFormComponent } from './components/EmailTemplateFormComponent'
import { EmailCopyData } from './components/EmailCopyData'
import { EmailTemplatePreviewComponent } from './components/EmailTemplatePreviewComponent'
import { Layout } from '../ui/Layout'

interface Props {
  pageContext: {
    emailTemplate: EmailTemplate
  }
}

export const TEST_IDS = {
  name: 'name',
  description: 'description',
}

const buildCopyId = ({ component }: EmailTemplateComponentItem, i: number): string => {
  return `${component}-${i}`
}

const styles = {
  page: { width: '100%' },
  container: { display: 'flex', gap: 4, width: '100%' },
  pane: { flex: 1 },
}

const BasicTemplate: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <EmailCopyData>
      <Layout>
        <div style={styles.page}>
          <div>
            <h1 data-testid={TEST_IDS.name}>{emailTemplate.name}</h1>
            <p data-testid={TEST_IDS.description}>{emailTemplate.description}</p>
          </div>

          <div style={styles.container}>
            <div style={styles.pane}>
              {emailTemplate.components.map((emailTemplateComponentItem, i) => (
                <EmailTemplateFormComponent
                  key={i}
                  copyId={buildCopyId(emailTemplateComponentItem, i)}
                  emailTemplateComponentItem={emailTemplateComponentItem}
                />
              ))}
            </div>
            <Root.div style={styles.pane}>
              {emailTemplate.components.map((emailTemplateComponentItem, i) => (
                <EmailTemplatePreviewComponent
                  key={i}
                  copyId={buildCopyId(emailTemplateComponentItem, i)}
                  emailTemplateComponentItem={emailTemplateComponentItem}
                />
              ))}
            </Root.div>
          </div>
        </div>
      </Layout>
    </EmailCopyData>
  )
}

export default BasicTemplate
