import React, { FC } from 'react'
import type { HeadFC } from 'gatsby'
import { Layout } from '../ui/Layout'
import './index.css'

const IndexPage: FC = () => {
  return (
    <Layout>
      <main className="page">
        <h1 className="heading">Email Builder CMS</h1>
        <p className="paragraph">This is a placeholder homepage for now.</p>
        <p className="paragraph">
          <a href="/admin" className="link">
            The admin interface can be accessed here.
          </a>
        </p>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
