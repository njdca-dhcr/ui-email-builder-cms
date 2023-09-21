import React, { FC } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { NewLayout, PageContent, SideBarList, SideBarListItem, Sidebar } from 'src/ui/NewLayout'
import 'src/styles/app.css'

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
        <h1 className="heading">Email Builder CMS</h1>
        <p className="paragraph">This is a placeholder homepage for now.</p>
        <p className="paragraph">
          <a href="/admin" className="link">
            The admin interface can be accessed here.
          </a>
        </p>
      </PageContent>
    </NewLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Email Builder (Beta)</title>
