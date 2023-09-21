import React, { FC } from 'react'
import { type HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { VisuallyHidden } from '@reach/visually-hidden'
import {
  Heading,
  NewLayout,
  PageContent,
  Paragraph,
  Sidebar,
  SpacedContainer,
} from 'src/ui/NewLayout'
import { List } from 'src/ui/List'
import 'src/styles/app.css'
import './index.css'
import { Button } from 'src/ui/Button'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const IndexPage: FC = () => {
  return (
    <NewLayout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <VisuallyHidden>
            <h1>Email Builder (Beta)</h1>
          </VisuallyHidden>
          <section>
            <Heading element="h2">Start with a template</Heading>
            <Paragraph>
              You can edit and change everything—it just gives you a starting place.
            </Paragraph>
            <List className="index-list">
              <li />
              <li />
              <li />
            </List>
          </section>
          <section className="index-or">--or--</section>
          <section>
            <Heading element="h2">Build your own email</Heading>
            <Paragraph>You know what you want so make it happen.</Paragraph>
            <Button onClick={() => {}}>Build from scratch</Button>
          </section>
        </SpacedContainer>
      </PageContent>
    </NewLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Email Builder (Beta)</title>
