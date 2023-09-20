import React, { FC, useRef, useState } from 'react'
import type { HeadFC } from 'gatsby'
import type { EmailTemplate } from 'src/appTypes'
import { Layout } from 'src/ui/Layout'
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
    <Layout>
      <BasicTemplateContents emailTemplate={emailTemplate} />
    </Layout>
  )
}

export default BasicTemplate

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{name}</title>
}
