import React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import { Layout } from 'src/ui/Layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 className="heading">Page not found</h1>
      <p className="paragraph">
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in{' '}
            <code
              style={{
                color: '#8A6534',
                padding: 4,
                backgroundColor: '#FFF4DB',
                fontSize: '1.25rem',
                borderRadius: 4,
              }}
            >
              src/pages/
            </code>
            .
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
