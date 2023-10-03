import React, { FC, ReactNode } from 'react'

interface HtmlProps {
  children: ReactNode
  lang: string
  xmlns: string
  'xmlns:v': string
  'xmlns:o': string
}

const Html: FC<HtmlProps> = ({ children, ...props }) => {
  return <html {...props}>{children}</html>
}

interface EmailLayoutProps {
  html: string
}

export const EmailLayout: FC<EmailLayoutProps> = ({ html }) => {
  return (
    <>
      <Html
        {...{
          lang: 'en',
          xmlns: 'http://www.w3.org/1999/xhtml',
          'xmlns:v': 'urn:schemas-microsoft-com:vml',
          'xmlns:o': 'urn:schemas-microsoft-com:office:office',
        }}
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
          <link
            href="https://fonts.googleapis.com/css?family=Public%20Sans:700&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Public%20Sans:400&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Public%20Sans:400i&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style={styles.body}
          {...{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Html>
    </>
  )
}

// Styles in the emails must remain inline
const styles = {
  body: {
    background: '#F5F5F5',
    margin: 0,
    padding: '0 !important',
    msoLineHeightRule: 'exactly',
    letterSpacing: '-0.0125em',
  },
}
