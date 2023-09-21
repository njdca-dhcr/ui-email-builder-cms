import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { Heading, NewLayout, PageContent, Sidebar } from 'src/ui/NewLayout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const LibaryPage: FC = () => {
  return (
    <NewLayout>
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <div style={{ padding: '11.5rem 5.25rem' }}>
          <Heading element="h1">Library</Heading>
        </div>
      </PageContent>
    </NewLayout>
  )
}

export default LibaryPage

export const Head: HeadFC = () => <title>Libary</title>
