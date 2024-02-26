import React, { FC, useState } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { RichTextValue } from 'src/ui/RichTextEditor'

const TipsAndTricksPage: FC = () => {
  const [value, setValue] = useState<RichTextValue>([
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>' },
        { text: '! ' },
        { text: 'Also there is a ' },
        {
          type: 'link',
          url: 'https://en.wikipedia.org/wiki/Hypertext',
          children: [{ text: 'hyperlink' }],
        },
      ],
    },
  ])

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Tips & Tricks</Heading>
          <Paragraph>Coming soon.</Paragraph>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default TipsAndTricksPage

export const Head: HeadFC = () => <title>{formatPageTitle('Tips & Tricks')}</title>
