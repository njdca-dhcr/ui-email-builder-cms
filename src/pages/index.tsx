import React, { FC } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { VisuallyHidden } from '@reach/visually-hidden'
import { NewLayout, PageContent, SideBarList, SideBarListItem, Sidebar } from 'src/ui/NewLayout'
import { List } from 'src/ui/List'
import 'src/styles/app.css'
import './index.css'
import { Button } from 'src/ui/Button'

const IndexPage: FC = () => {
  return (
    <NewLayout element="div">
      <Sidebar>
        <nav>
          <SideBarList>
            <SideBarListItem>
              <Link activeClassName="sidebar-active-link" to="/">
                Home
              </Link>
            </SideBarListItem>
            <SideBarListItem>
              <Link activeClassName="sidebar-active-link" to="/library">
                Library
              </Link>
            </SideBarListItem>
            <SideBarListItem>
              <Link activeClassName="sidebar-active-link" to="/tips-and-tricks">
                Tips & Tricks
              </Link>
            </SideBarListItem>
          </SideBarList>
        </nav>
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <div className="index-container">
          <VisuallyHidden>
            <h1>Email Builder (Beta)</h1>
          </VisuallyHidden>
          <section>
            <h2 className="index-title">Start with a template</h2>
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
            <h2 className="index-title">Build your own email</h2>
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
