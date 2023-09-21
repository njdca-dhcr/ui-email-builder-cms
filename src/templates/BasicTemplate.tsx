import React, { FC } from 'react'
import type { HeadFC } from 'gatsby'
import { NewLayout, PageContent, Sidebar } from 'src/ui/NewLayout'
import type { EmailTemplate } from 'src/appTypes'
import { BasicTemplateContents } from './BasicTemplateContents'
import './BasicTemplate.css'

interface PageContext {
  emailTemplate: EmailTemplate
}

interface Props {
  pageContext: PageContext
}

const BasicTemplate: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <NewLayout element="main">
      <Sidebar>placeholder</Sidebar>
      <PageContent element="div">
        <BasicTemplateContents emailTemplate={emailTemplate} />
      </PageContent>
    </NewLayout>
  )
}

export default BasicTemplate

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{name}</title>
}
