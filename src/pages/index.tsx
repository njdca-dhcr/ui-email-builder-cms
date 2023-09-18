import React, { FC } from 'react'
import type { HeadFC } from 'gatsby'
import { Layout } from '../ui/Layout'

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

const linkStyle = {
  color: '#8954A8',
  fontWeight: 'bold',
  fontSize: 16,
  verticalAlign: '5%',
}

const IndexPage: FC = () => {
  return (
    <Layout>
      <main style={pageStyles}>
        <h1 style={headingStyles}>Email Builder CMS</h1>
        <p style={paragraphStyles}>This is a placeholder homepage for now.</p>
        <p style={paragraphStyles}>
          <a href="/admin" style={linkStyle}>
            The admin interface can be accessed here.
          </a>
        </p>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
