import React, { FC } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { List } from 'src/ui/List'
import 'src/styles/app.css'
import './index.css'
import { Button } from 'src/ui/Button'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const IndexPage: FC = () => {
  return (
    <Layout element="div">
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
            <div className="heading-and-actions">
              <Heading element="h2">Start with a template</Heading>
              <div>
                <Link to="/library">See All Templates</Link>
              </div>
            </div>
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
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Email Builder (Beta)</title>
