import React, { FC } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Heading, NewLayout, PageContent, Sidebar } from 'src/ui/NewLayout'
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
        <div className="index-container">
          <VisuallyHidden>
            <h1>Email Builder (Beta)</h1>
          </VisuallyHidden>
          <section>
            <Heading element="h2">Start with a template</Heading>
            <p className="index-description">
              You can edit and change everything—it just gives you a starting place.
            </p>
            <List className="index-list">
              <li />
              <li />
              <li />
            </List>
          </section>
          <section className="index-or">--or--</section>
          <section>
            <Heading element="h2">Build your own email</Heading>
            <p className="index-description">You know what you want so make it happen.</p>
            <Button onClick={() => {}}>Build from scratch</Button>
          </section>
        </div>
      </PageContent>
    </NewLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Email Builder (Beta)</title>
