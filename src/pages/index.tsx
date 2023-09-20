import React, { FC } from 'react'
import type { HeadFC } from 'gatsby'
import { Layout } from 'src/ui/Layout'

const IndexPage: FC = () => {
  return (
    <Layout>
      <h1 className="heading">Email Builder CMS</h1>
      <p className="paragraph">This is a placeholder homepage for now.</p>
      <p className="paragraph">
        <a href="/admin" className="link">
          The admin interface can be accessed here.
        </a>
      </p>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
